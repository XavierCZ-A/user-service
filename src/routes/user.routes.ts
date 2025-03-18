import { Router } from "express";
import type {
	IUserController,
	IUserRepository,
	IUserService,
} from "../types/user";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../services/user.service";
import { UserController } from "../controllers/user.controller";
import { validateData } from "../middlewares/validateData";
import { userSchema } from "../schemas/user.schema";

const userRouter = Router();

const userRepository: IUserRepository = new UserRepository();
const userService: IUserService = new UserService(userRepository);
const userController: IUserController = new UserController(userService);

userRouter.post("/", validateData(userSchema), userController.create);
userRouter.delete("/:id", userController.delete);
userRouter.put("/:id", userController.update);

export default userRouter;
