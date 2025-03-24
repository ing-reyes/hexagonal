import { ApiOneResponse } from "../../common/interfaces/api-response.interface";
import { User } from "../domain/entities/user.entity";
import { UsersRepository } from "../domain/repositories/users.repository";

interface UseCase {
    execute(id: string): Promise<ApiOneResponse<User>>;
}

export class RemoveUser implements UseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    execute(id: string): Promise<ApiOneResponse<User>> {
        return this.usersRepository.remove(id);
    }
}