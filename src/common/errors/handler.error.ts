import { Response } from "express";

import { ManagerError } from "./manager.error";

export class Handler {
    static error(error: unknown, res: Response) {
        if (error instanceof ManagerError) {
            res.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message, statusMsg: error.statusMsg });
            return;
        }

        res.status(500).json({ statusCode: 500, message: 'Internal Server Error', statusMsg: 'INTERNAL_SERVER_ERROR' });
    }
}