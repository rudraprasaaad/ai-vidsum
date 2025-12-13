import logger from "./logger";

export class AppError extends Error {
    constructor(public statusCode: number,
        public message: string,
        public isOperational = true) {
        super(message)
        Object.setPrototypeOf(this, AppError.prototype)
    }
}

export const handleError = (err: Error | AppError) => {
    if (err instanceof AppError && err.isOperational) {
        return {
            status: "error",
            statusCode: err.statusCode,
            message: err.message
        }
    }

    logger.error(err);
    return {
        status: "error",
        statusCode: 500,
        message: "Internal Server Error"
    }
};