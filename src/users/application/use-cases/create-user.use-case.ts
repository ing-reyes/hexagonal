import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

interface UseCase {
    execute(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>>;
}

export class CreateUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>> {
        return this.userRepository.create(createUserDto);
    }
}