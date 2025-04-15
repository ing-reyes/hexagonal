import mongoose, { Schema } from "mongoose";
import { UserRole } from "../../../users/domain/enums/user.role";

export const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'Name is required'],
    },
    email: {
        type: String,
        require: [true, 'Email is required'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'Password is required'],
    },
    roles: {
        type: [String],
        enum: Object.values(UserRole),
        default: [UserRole.USER],
    },
});

userSchema.set('toJSON', {
    virtuals: false,
    versionKey: false,
    transform: (document, returnedObject) => {
        returnedObject.id = document._id
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

export const UserModel = mongoose.model('User', userSchema);