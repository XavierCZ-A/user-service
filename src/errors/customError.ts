// src/errors/customError.ts
export class CustomError extends Error {
	constructor(
		public readonly message: string,
		public readonly statusCode: number,
		public readonly code?: string,
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		public readonly details?: any,
	) {
		super(message);
		this.name = this.constructor.name;
		Error.captureStackTrace(this, this.constructor);
	}
}

// Errores específicos
export class NotFoundError extends CustomError {
	constructor(message = "Recurso no encontrado") {
		super(message, 404, "NOT_FOUND");
	}
}

export class BadRequestError extends CustomError {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(message = "Datos inválidos", details?: any) {
		super(message, 400, "BAD_REQUEST", details);
	}
}

export class UnauthorizedError extends CustomError {
	constructor(message = "No autorizado") {
		super(message, 401, "UNAUTHORIZED");
	}
}

export class PrismaError extends CustomError {
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	constructor(message = "Error en la base de datos", error?: any) {
		super(message, 500, "DATABASE_ERROR", error);
	}
}
