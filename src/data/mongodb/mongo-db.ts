import { injectable } from "inversify";
import { Logger } from '../../common/logging/logger';
import mongoose from "mongoose";
import { SaveLogger } from "../../common/logging/save-logger";

interface Options {
    mongoUrl: string;
    dbName: string;
}

@injectable()
export class MongoDB {
    private readonly saveLogger = new SaveLogger(MongoDB.name)
    private readonly logger = new Logger(MongoDB.name)

    async connect(options: Options) {
        const { dbName, mongoUrl } = options;
        try {
            await mongoose.connect(mongoUrl, { dbName });

            this.logger.log('Mongo Database Connected', MongoDB.name);
            return true;
        } catch (error) {
            this.logger.error('Mongo Connection Error', MongoDB.name);
            this.saveLogger.error('Mongo Database Connection Error', 'mongo-db.ts');
            throw error;
        }
    }
}