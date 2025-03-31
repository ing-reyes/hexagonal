import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { CreateUserDto } from "../dtos/create-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase {
    execute(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>>;
}

@injectable()
export class CreateUserUseCase implements UseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    execute(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>> {
        return this.userRepository.create(createUserDto);
    }
}