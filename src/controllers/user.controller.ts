import type { NextFunction, Request, Response } from "express";
import type { IUserController, IUserService } from "../types/user";

export class UserController implements IUserController {
	private userService: IUserService;
	constructor(userService: IUserService) {
		this.userService = userService;
	}

	create = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const user = req.body;
			const createdUser = await this.userService.createUser(user);
			res.status(201).json({ success: true, data: createdUser });
		} catch (error) {
			next(error);
		}
	};

	update = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = req.body;
			const updatedUser = await this.userService.updateUser(Number(id), user);
			if (!updatedUser) {
				res.status(404).json({ success: false, error: "User not found" });
				return;
			}
			res.status(200).json({ success: true, data: updatedUser });
		} catch (error) {
			next(error);
		}
	};

	delete = async (
		req: Request,
		res: Response,
		next: NextFunction,
	): Promise<void> => {
		try {
			const { id } = req.params;
			const user = await this.userService.deleteUser(Number(id));
			if (!user) {
				res.status(404).json({ success: false, error: "User not found" });
				return;
			}
			res.status(200).json({ success: true, data: user });
		} catch (error) {
			next(error);
		}
	};
}
