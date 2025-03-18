import bcrypt from "bcrypt";
import type {
	CreateUserDto,
	IUserRepository,
	IUserService,
	UpdateUserDto,
	User,
} from "../types/user";
import { CustomError, PrismaError } from "../errors/customError";
import { Prisma } from "@prisma/client";
import { hashPassword } from "../utils/hashedPassword";

export class UserService implements IUserService {
	private userRepository: IUserRepository;
	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async createUser(user: CreateUserDto): Promise<User> {
		const existingUser = await this.userRepository.findOneByEmail(user.email);
		if (existingUser) {
			throw new CustomError("El correo ya está en uso", 409, "DUPLICATE_ENTRY");
		}

		try {
			const hashedPassword = await hashPassword(user.password);

			const newUser = { ...user, password: hashedPassword };

			return await this.userRepository.create(newUser);
		} catch (error) {
			if (error instanceof Prisma.PrismaClientKnownRequestError) {
				throw new PrismaError("Error al crear usuario", error);
			}

			throw new CustomError(
				"Error interno al crear usuario",
				500,
				"INTERNAL_ERROR",
			);
		}
	}

	async updateUser(id: number, user: UpdateUserDto): Promise<User | null> {
		return await this.userRepository.update(id, user);
	}

	async deleteUser(id: number): Promise<boolean> {
		return await this.userRepository.delete(id);
	}
}
