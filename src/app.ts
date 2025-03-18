import express from "express";
import router from "./routes";
import { errorHandler } from "./middlewares/errorHandler";
// import routes from "./routes"; // Importar las rutas

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Check if the server is running
app.get("/health", (req, res) => {
	res.status(200).json({ status: "ok", message: "Server is running" });
});

// Routes
app.use("/api", router);

// Error handler
app.use(
	(
		err: Error,
		req: express.Request,
		res: express.Response,
		next: express.NextFunction,
	) => {
		errorHandler(err, req, res, next);
	},
);

export default app;
