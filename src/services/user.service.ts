import { createHmac } from "node:crypto";
import type {
	CreateUserDto,
	IUserRepository,
	IUserService,
	UpdateUserDto,
	User,
} from "../types/user";

export class UserService implements IUserService {
	private userRepository: IUserRepository;
	constructor(userRepository: IUserRepository) {
		this.userRepository = userRepository;
	}

	async createUser(user: CreateUserDto): Promise<User> {
		const { password } = user;
		const hashPassword = createHmac("sha256", password).digest("hex");
		console.log(hashPassword);
		return await this.userRepository.create(user);
	}

	async updateUser(id: number, user: UpdateUserDto): Promise<User | null> {
		return await this.userRepository.update(id, user);
	}

	async deleteUser(id: number): Promise<boolean> {
		return await this.userRepository.delete(id);
	}
}
