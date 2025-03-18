import jwt from "jsonwebtoken";
import { envs } from "../config/envs";

const JWT_SEED = envs.JWT_TOKEN;

// export const async validateToken<T>(token: string): Promise<T | null> {
//     try {
//         const decoded = jwt.verify(token, JWT_SEED) as T;
//         return decoded;
//     } catch (error) {
//         console.error('Error validating JWT:', error);
//         return null;
//     }
// }

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
// export const generateToken = async (payload: any, duration = "2h") => {
// 	return new Promise((resolve) => {
// 		jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
// 			if (err) return resolve(null);

// 			resolve(token);
// 		});
// 	});
// };
