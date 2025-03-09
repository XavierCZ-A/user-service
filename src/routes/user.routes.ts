import { Router } from "express";
import type {
	IUserController,
	IUserRepository,
	IUserService,
} from "../types/user";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
const router = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const userController: IUserController = new UserController(userService);

router.post("/user", userController.create);
router.delete("/user/:id", userController.delete);
router.put("/user/:id", userController.update);

export default router;
