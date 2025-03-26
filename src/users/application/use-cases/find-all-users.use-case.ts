import { ApiAllResponse } from "../../../common/interfaces/api-response.interface";
import { PaginationDto } from "../../../common/dtos/pagination/pagination.dto";
import { User } from "../../domain/entities/user.entity";
import { UserRepository } from "../../domain/repositories/user.repository";

interface UseCase {
    execute(paginationDto: PaginationDto): Promise<ApiAllResponse<User>>;
}

export class FindAllUsersUseCase implements UseCase {
    constructor(
        private readonly userRepository: UserRepository,
    ) { }

    execute(paginationDto: PaginationDto): Promise<ApiAllResponse<User>> {
        return this.userRepository.findAll(paginationDto);
    }
}