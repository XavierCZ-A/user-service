import { z } from "zod";

export const userSchema = z
	.object({
		name: z
			.string({
				invalid_type_error: "Name must be a string",
				required_error: "Name is required",
			})
			.min(3, "Name must be at least 3 characters long"),
		last_name: z
			.string({
				invalid_type_error: "Last name must be a string",
				required_error: "Last name is required",
			})
			.min(3, "Last name must be at least 3 characters long"),
		password: z
			.string({
				invalid_type_error: "Password must be a string",
				required_error: "Password is required",
			})
			.min(6, "Password must be at least 6 characters long"),
		email: z
			.string({
				invalid_type_error: "Email must be a string",
				required_error: "Email is required",
			})
			.email({ message: "Invalid email" }),
	})
	.strict({ message: "Invalid User" });
