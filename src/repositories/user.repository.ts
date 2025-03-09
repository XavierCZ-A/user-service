import prisma from "../config/prismadb";
import type {
	CreateUserDto,
	IUserRepository,
	UpdateUserDto,
	User,
} from "../types/user";

export class UserRepository implements IUserRepository {
	async create(data: CreateUserDto): Promise<User> {
		return await prisma.user.create({ data });
	}

	async update(id: number, data: UpdateUserDto): Promise<User | null> {
		return await prisma.user.update({ where: { id }, data });
	}

	async delete(id: number): Promise<boolean> {
		await prisma.user.delete({ where: { id } });
		return true;
	}
}
