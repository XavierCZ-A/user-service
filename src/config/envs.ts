import { get } from "env-var";

export const envs = {
	PORT: get("PORT").required().asPortNumber(),
	JWT_TOKEN: get("JWT_SECRET").required().asString(),
};
