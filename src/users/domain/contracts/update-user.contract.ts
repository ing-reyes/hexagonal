import { UserRole } from "../enums/user.role";

export type UpdateUserContract = {
    name?: string;
    email?: string;
    password?: string;
    roles?: UserRole[];
}