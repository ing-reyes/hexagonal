import { Response } from "express";
import { injectable } from "inversify";

import { ManagerError } from "./manager.error";
import { SaveLogger } from "../logging/save-logger";

@injectable()
export class Handler {
    private readonly saveLogger = new SaveLogger(Handler.name);

    error(error: unknown, res: Response) {
        if (error instanceof ManagerError) {
            res.status(error.statusCode).json({ statusCode: error.statusCode, error: error.message, statusMsg: error.statusMsg });
            return;
        }

        if(error instanceof Error){
            res.status(500).json({ statusCode: 500, error: error.message, statusMsg: 'INTERNAL_SERVER_ERROR' });
            return;
        }
        
        this.saveLogger.error(error, 'handler.error.ts');
        res.status(500).json({ statusCode: 500, error: 'INTERNAL_SERVER_ERROR', statusMsg: 'INTERNAL_SERVER_ERROR' });
    }
}