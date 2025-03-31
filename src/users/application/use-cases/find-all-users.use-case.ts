import { ApiAllResponse } from "../../../common/interfaces/api-response.interface";
import { PaginationDto } from "../../../common/dtos/pagination/pagination.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase {
    execute(paginationDto: PaginationDto): Promise<ApiAllResponse<User>>;
}

@injectable()
export class FindAllUsersUseCase implements UseCase {
    constructor(
        @inject(TYPES.UserRepository)
        private readonly userRepository: UserRepository,
    ) { }

    execute(paginationDto: PaginationDto): Promise<ApiAllResponse<User>> {
        return this.userRepository.findAll(paginationDto);
    }
}