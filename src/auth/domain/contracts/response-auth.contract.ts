import { User } from "../../../users/domain/entities/user.entity";

export type ResponseAuthContract = {
    user: User;
    accessToken: string;
};