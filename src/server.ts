import app from "./app";
import { envs } from "./config/envs";
import prisma from "./config/prismadb";

const PORT = envs.PORT;

app.listen(PORT, () => {
	console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
	await prisma.$disconnect();
	process.exit(0);
});
