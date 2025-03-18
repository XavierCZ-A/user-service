import type { NextFunction, Request, Response } from "express";

// Tipo para las credenciales de login
export interface LoginCredentials {
	email: string;
	password: string;
}

export interface IAuthService {
	login(credentials: LoginCredentials): Promise<AuthResponse>;
}

export interface IAuthController {
	login(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface AuthResponse {
	user: UserInfo;
	token: AuthTokens;
}

export interface UserInfo {
	email: string;
	name: string;
	lastName?: string;
}

export interface AuthTokens {
	accessToken: string;
}
