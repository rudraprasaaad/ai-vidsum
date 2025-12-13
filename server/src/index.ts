import express, { Express, NextFunction, Request, Response } from "express";
import dotenv from "dotenv";
import logger from "./utils/logger";
import { AppDataSource } from "./utils/config/database";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes";
import { errorResponse } from "./utils/response";
import { handleError } from "./utils/errors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 6000;


const initialize = async () => {
	try {
		await AppDataSource.initialize();
		app.listen(PORT, () => {
			logger.info("Database Connected.")
			logger.info(`Server is running on port ${PORT}`);
			logger.info(`Environment: ${process.env.NODE_ENV}`);
		});
	}
	catch (error) {
		logger.error(error);
	}
}

app.use(cors());
app.use(express.json());
app.use(morgan(process.env.NODE_ENV === "DEVELOPMENT" ? "dev" : "combined", { stream: { write: (message) => logger.info(message) } }));

const API_VERSION = "/api/v1";

app.use(API_VERSION, routes);

app.use((req: Request, res: Response) => {
	res.status(404).json(errorResponse(`Cannot find ${req.originalUrl} on this server`))
})

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	logger.error(err.stack || err.message);
	const error = handleError(err);

	res.status(error.statusCode).json(errorResponse(error.message, error));
});

initialize().catch(err => {
	logger.error(err);
	process.exit(1);
});