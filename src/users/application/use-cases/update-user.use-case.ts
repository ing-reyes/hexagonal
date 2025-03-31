
import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase {
    execute(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>>;
}

@injectable()
export class UpdateUserUseCase implements UseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    execute(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>> {
        return this.userRepository.update(id, updateUserDto);
    }
}