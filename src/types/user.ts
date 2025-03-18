import type { NextFunction, Request, Response } from "express";

export interface User {
	id: number;
	name: string;
	last_name: string;
	email: string;
	password: string;
}

export type CreateUserDto = Omit<User, "id">;

export type UpdateUserDto = Partial<Omit<User, "id">>;

export type UserResponseDto = User;

export interface ApiResponse<T = unknown> {
	success: boolean;
	data?: T;
	error?: string;
	message?: string;
}

export interface IUserService {
	createUser(user: CreateUserDto): Promise<User>;
	updateUser(id: number, user: UpdateUserDto): Promise<User | null>;
	deleteUser(id: number): Promise<boolean>;
}

export interface IUserRepository {
	create(data: CreateUserDto): Promise<User>;
	update(id: number, data: UpdateUserDto): Promise<User | null>;
	delete(id: number): Promise<boolean>;
	findOneByEmail(email: string): Promise<User | null>;
}

export interface IUserController {
	create(req: Request, res: Response, next: NextFunction): Promise<void>;
	update(req: Request, res: Response, next: NextFunction): Promise<void>;
	delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}
