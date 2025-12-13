import { Router } from "express";
import { successResponse } from "../utils/response";
const router: Router = Router();

router.get("/", (req, res) => {
    res.json(successResponse({
        status: "ok",
        timestamp: new Date().toISOString(),
        message: "Server is running",
        environment: process.env.NODE_ENV,
    }))
})

export default router;