import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

interface UseCase {
    execute(id: string): Promise<ApiOneResponse<User | null>>;
}

export class FindOneUserUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute(id: string): Promise<ApiOneResponse<User | null>> {
        return this.userRepository.findOne(id);
    }
}