import winston, { log } from "winston";
import path from "path";
import fs from "fs";

const levels = {
	error: 0,
	warn: 1,
	info: 2,
	http: 3,
	debug: 4,
};

const colors = {
	error: "red",
	warn: "yellow",
	info: "green",
	http: "magenta",
	debug: "white",
};

// it will add colors to to winston from colors object
winston.addColors(colors);

// it will format for console
const consoleFormat = winston.format.combine(
	winston.format.timestamp({
		format: "YYYY-MM-DD HH:mm:ss",
	}),
	winston.format.colorize({ all: true }),
	winston.format.printf(
		(info) => `${info.timestamp} ${info.level}: ${info.message}`,
	)
);


// it is for file format
const fileFormat = winston.format.combine(
	winston.format.timestamp({
		format: "YYYY-MM-DD HH:mm:ss",
	}),
	winston.format.json()
);

const level = () => {
	const env = process.env.NODE_ENV || "development";
	return env === "development" ? "debug" : "warn";
}

const logDir = "logs";
const errLog = path.join(logDir, "error.log");
const combinedLog = path.join(logDir, "combined.log");


if (!fs.existsSync(logDir)) {
	fs.mkdirSync(logDir, { recursive: true });
}

// logger instance
const logger = winston.createLogger({
	level: level(),
	format: fileFormat,
	transports: [
		new winston.transports.File({ filename: errLog, level: "error" }),
		new winston.transports.File({ filename: combinedLog })
	],
})

if (process.env.NODE_ENV !== "production") {
	logger.add(new winston.transports.Console({
		format: consoleFormat,
	}));
}

export const stream = {
	write: (message: string) => {
		logger.http(message.trim());
	}
}

export default logger;