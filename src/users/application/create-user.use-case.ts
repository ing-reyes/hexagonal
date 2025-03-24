import { ApiOneResponse } from "../../common/interfaces/api-response.interface";
import { CreateUserDto } from "../domain/dtos/create-user.dto";
import { User } from "../domain/entities/user.entity";
import { UsersRepository } from "../domain/repositories/users.repository";

interface UseCase {
    execute(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>>;
}

export class CreateUser implements UseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    execute(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>> {
        return this.usersRepository.create(createUserDto);
    }
}