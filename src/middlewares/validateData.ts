import type { NextFunction, Request, Response } from "express";
import { z } from "zod";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export const validateData = (schema: z.ZodType<any>) => {
	return (req: Request, res: Response, next: NextFunction): void => {
		try {
			schema.parse(req.body);
			next();
		} catch (error) {
			if (error instanceof z.ZodError) {
				res.status(400).json({ errors: error.errors.map((e) => e.message) });
			} else {
				res.status(500).json({ message: "Internal server error" });
			}
		}
	};
};
