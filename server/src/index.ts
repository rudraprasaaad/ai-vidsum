import express, { Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT || 6000;


const initialize = async () => {
	try {
		app.listen(PORT, () => {
			console.log(`Server is running on port ${PORT}`);
			console.log(`Environment: ${process.env.NODE_ENV}`);
		});
	}
	catch (error) {
		console.error(error);
	}
}

initialize().catch(err => {
	console.error(err);
	process.exit(1);
});