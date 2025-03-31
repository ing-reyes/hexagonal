import { inject, injectable } from "inversify";
import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase {
    execute(id: string): Promise<ApiOneResponse<User | null>>;
}

@injectable()
export class FindOneUserUseCase implements UseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    execute(id: string): Promise<ApiOneResponse<User | null>> {
        return this.userRepository.findOne(id);
    }
}