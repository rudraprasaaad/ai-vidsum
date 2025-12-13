interface SuccessResponse {
    status: "success";
    data: any;
}

interface ErrorResponse {
    status: "error";
    message: string;
    errors?: any;
}

export const successResponse = (data: any): SuccessResponse => ({
    status: "success",
    data,
})

export const errorResponse = (message: string, error?: any): ErrorResponse => ({
    status: "error",
    message,
    ...(process.env.NODE_ENV === "DEVELOPMENT" && { errors: error })
})