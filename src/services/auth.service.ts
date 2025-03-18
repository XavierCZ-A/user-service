import { envs } from "../config/envs";
import { BadRequestError, CustomError } from "../errors/customError";
import type { UserRepository } from "../repositories/user.repository";
import type {
	AuthResponse,
	IAuthService,
	LoginCredentials,
} from "../types/auth";
import type { IUserRepository } from "../types/user";
import { comparePassword } from "../utils/hashedPassword";
import jwt from "jsonwebtoken";

export class AuthService implements IAuthService {
	private userRepository: UserRepository;

	constructor(userRepository: UserRepository) {
		this.userRepository = userRepository;
	}
	async login(credentials: LoginCredentials): Promise<AuthResponse> {
		const { email, password } = credentials;
		const user = await this.userRepository.findOneByEmail(email);
		if (!user) {
			throw new BadRequestError("Credenciales inválidas");
		}
		const comparedPassword = await comparePassword(password, user.password);
		if (!comparedPassword) {
			throw new BadRequestError("Credenciales inválidas");
		}
		try {
			const JWT_SEED = envs.JWT_TOKEN;
			const token = jwt.sign(
				{ id: user.id, email: user.email, username: user.name },
				JWT_SEED,
				{ expiresIn: "1h" },
			);

			return {
				user: { email: user.email, name: user.name, lastName: user.last_name },
				token: { accessToken: token },
			};
		} catch (error) {
			throw new CustomError(
				"Error al generar token",
				500,
				"TOKEN_ERROR",
				error,
			);
		}
	}
}
