import { ApiAllResponse, ApiOneResponse } from '../../../common/interfaces/api-response.interface';
import { CreateUserContract } from '../contracts/create-user.contract';
import { PaginationContract } from '../contracts/pagination.contract';
import { UpdateUserContract } from '../contracts/update-user.contract';
import { User } from "../entities/user.entity";

export abstract class UserDatasource {
    abstract create(createUserContract: CreateUserContract): Promise<ApiOneResponse<User>>;
    abstract findAll(paginationContract: PaginationContract): Promise<ApiAllResponse<User>>;
    abstract findOne(id: string): Promise<ApiOneResponse<User | null>>;
    abstract findOneByEmail(email: string): Promise<ApiOneResponse<User | null>>;
    abstract update(id: string, updateUserContract: UpdateUserContract): Promise<ApiOneResponse<User>>;
    abstract remove(id: string): Promise<ApiOneResponse<User>>;
}