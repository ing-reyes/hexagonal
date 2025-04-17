import { User } from "../../../users/domain/entities/user.entity";

declare global {
    namespace Express {
        interface Request {
            user: User;
        }
    }
}