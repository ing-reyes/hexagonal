import { User } from "../domain/entities/user.entity";
import { UsersRepository } from "../domain/repositories/users.repository";
import { UpdateUserDto } from '../domain/dtos/update-user.dto';
import { ApiOneResponse } from "../../common/interfaces/api-response.interface";

interface UseCase {
    execute(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>>;
}

export class UpdateUser implements UseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    execute(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>> {
        return this.usersRepository.update(id, updateUserDto);
    }
}