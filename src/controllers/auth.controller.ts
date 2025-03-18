import type { NextFunction, Request, Response } from "express";
import type { IAuthController, IAuthService } from "../types/auth";

export class AuthController implements IAuthController {
	private authService: IAuthService;
	constructor(authService: IAuthService) {
		this.authService = authService;
	}

	login = async (req: Request, res: Response, next: NextFunction) => {
		try {
			const credentials = req.body;
			const authResponse = await this.authService.login(credentials);
			res.status(200).json({ success: true, data: authResponse });
		} catch (error) {
			next(error);
		}
	};
}
