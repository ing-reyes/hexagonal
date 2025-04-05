import { Response } from "express";

import { Logger } from "../logging/logger";
import { ManagerError } from "./manager.error";
import { injectable } from "inversify";
import { SaveLogger } from "../logging/save-logger";

@injectable()
export class Handler {
    private readonly logger = new Logger(Handler.name);
    private readonly saveLogger = new SaveLogger(Handler.name);

    error(error: unknown, res: Response) {
        if (error instanceof ManagerError) {
            res.status(error.statusCode).json({ statusCode: error.statusCode, message: error.message, statusMsg: error.statusMsg });
            return;
        }

        this.logger.error(error);
        this.saveLogger.error(error, 'handler.error.ts');
        res.status(500).json({ statusCode: 500, message: 'Internal Server Error', statusMsg: 'INTERNAL_SERVER_ERROR' });
    }
}