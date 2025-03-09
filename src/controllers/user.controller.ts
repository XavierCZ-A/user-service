import type { Request, Response } from "express";
import type { IUserController, IUserService } from "../types/user";

export class UserController implements IUserController {
	private userService: IUserService;
	constructor(userService: IUserService) {
		this.userService = userService;
	}

	create = async (req: Request, res: Response): Promise<void> => {
		try {
			const user = req.body;
			const createdUser = await this.userService.createUser(user);
			res.status(201).json({ success: true, data: createdUser });
		} catch (error) {
			console.error(error);
			res.status(500).json({ success: false, error: "Internal server error" });
		}
	};

	update = async (req: Request, res: Response): Promise<void> => {
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
			console.error(error);
			res.status(500).json({ success: false, error: "Internal server error" });
		}
	};

	delete = async (req: Request, res: Response): Promise<void> => {
		try {
			const { id } = req.params;
			const deleted = await this.userService.deleteUser(Number(id));
			if (!deleted) {
				res.status(404).json({ success: false, error: "User not found" });
				return;
			}
			res.status(200).json({ success: true, data: deleted });
		} catch (error) {
			console.log(error);
			res.status(500).json({ success: false, error: "Internal server error" });
		}
	};
}
