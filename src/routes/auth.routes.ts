import { Router } from "express";
import { AuthService } from "../services/auth.service";

const authRouter = Router();

import { UserRepository } from "../repositories/user.repository";
import { AuthController } from "../controllers/auth.controller";

const userRepository = new UserRepository();
const authService = new AuthService(userRepository);
const authController = new AuthController(authService);

authRouter.post("/login", authController.login);

export default authRouter;
