import mongoose from "mongoose";

export class ValidatorsAdapter {
    static isMongoId(id: string): boolean {
        return mongoose.Types.ObjectId.isValid(id);
    }

    static isNumberId(id: string): boolean {
        return !isNaN(+id);
    }

    static isEmail(email: string): boolean {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }
}