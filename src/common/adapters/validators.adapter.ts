import { injectable } from "inversify";
import mongoose from "mongoose";

@injectable()
export class ValidatorsAdapter {
    isMongoId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    isNumberId(id: string): boolean {
        return !isNaN(+id);
    }
}