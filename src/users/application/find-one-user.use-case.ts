import { ApiOneResponse } from "../../common/interfaces/api-response.interface";
import { User } from "../domain/entities/user.entity";
import { UsersRepository } from "../domain/repositories/users.repository";

interface UseCase {
    execute(id: string): Promise<ApiOneResponse<User | null>>;
}

export class FindOneUser implements UseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    execute(id: string): Promise<ApiOneResponse<User | null>> {
        return this.usersRepository.findOne(id);
    }
}