import { CreateUserDto } from '../dtos/create-user.dto';
import { PaginationDto } from '../../../common/dtos/pagination/pagination.dto';
import { UpdateUserDto } from "../dtos/update-user.dto";
import { User } from "../entities/user.entity";
import { ApiAllResponse, ApiOneResponse } from '../../../common/interfaces/api-response.interface';

export abstract class UsersDatasource {
    abstract create(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>>;
    abstract findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<User>>;
    abstract findOne(id: string): Promise<ApiOneResponse<User | null>>;
    abstract update(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>>;
    abstract remove(id: string): Promise<ApiOneResponse<User>>;
}