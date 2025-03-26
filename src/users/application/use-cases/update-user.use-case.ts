
import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

interface UseCase {
    execute(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>>;
}

export class UpdateUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>> {
        return this.userRepository.update(id, updateUserDto);
    }
}