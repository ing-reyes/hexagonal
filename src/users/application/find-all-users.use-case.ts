import { User } from "../domain/entities/user.entity";
import { UsersRepository } from "../domain/repositories/users.repository";
import { PaginationDto } from '../../common/dtos/pagination/pagination.dto';
import { ApiAllResponse } from "../../common/interfaces/api-response.interface";

interface UseCase {
    execute(paginationDto: PaginationDto): Promise<ApiAllResponse<User>>;
}

export class FindAllUsers implements UseCase {
    constructor(
        private readonly usersRepository: UsersRepository,
    ) { }

    execute(paginationDto: PaginationDto): Promise<ApiAllResponse<User>> {
        return this.usersRepository.findAll(paginationDto);
    }
}