// src/middleware/errorHandler.ts
import type { Request, Response, NextFunction } from "express";
import { CustomError } from "../errors/customError";
import { Prisma } from "@prisma/client";

export const errorHandler = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error(`[Error] ${err.message}`, err);

	if (err instanceof CustomError) {
		return res.status(err.statusCode).json({
			success: false,
			statusCode: err.statusCode,
			code: err.code || "ERROR",
			message: err.message,
			details: err.details,
		});
	}

	// Manejo específico de errores de Prisma
	if (err instanceof Prisma.PrismaClientKnownRequestError) {
		// P2002: Unique constraint violation
		if (err.code === "P2002") {
			return res.status(409).json({
				success: false,
				code: "DUPLICATE_ENTRY",
				message: "Ya existe un registro con este valor único",
				details: {
					fields: err.meta?.target,
				},
			});
		}

		// P2025: Record not found
		if (err.code === "P2025") {
			return res.status(404).json({
				success: false,
				code: "NOT_FOUND",
				message: "Registro no encontrado",
				details: err.meta,
			});
		}

		// Otros errores de Prisma
		return res.status(500).json({
			success: false,
			code: `PRISMA_${err.code}`,
			message: "Error en la base de datos",
			details:
				process.env.NODE_ENV === "development"
					? {
							code: err.code,
							meta: err.meta,
						}
					: undefined,
		});
	}

	if (err instanceof Prisma.PrismaClientValidationError) {
		return res.status(400).json({
			success: false,
			code: "VALIDATION_ERROR",
			message: "Error de validación en la consulta",
			details: process.env.NODE_ENV === "development" ? err.message : undefined,
		});
	}

	// Error no controlado
	return res.status(500).json({
		success: false,
		code: "INTERNAL_ERROR",
		message: "Error interno del servidor",
		details: process.env.NODE_ENV === "development" ? err.message : undefined,
	});
};
