import { ApiAllResponse, ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { CreateUserContract } from "../../domain/contracts/create-user.contract";
import { PaginationContract } from "../../domain/contracts/pagination.contract";
import { UpdateUserContract } from "../../domain/contracts/update-user.contract";
import { User } from "../../domain/entities/user.entity";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserRepository } from "../../domain/repositories/user.repository";

export class UserRepositoryImpl implements UserRepository {

    constructor(
        private readonly userDatasource: UserDatasource,
    ) { }

    create(createUserContract: CreateUserContract): Promise<ApiOneResponse<User>> {
        return this.userDatasource.create(createUserContract);
    }
    findAll(paginationContract: PaginationContract): Promise<ApiAllResponse<User>> {
        return this.userDatasource.findAll(paginationContract);
    }
    findOne(id: string): Promise<ApiOneResponse<User | null>> {
        return this.userDatasource.findOne(id);
    }
    update(id: string, updateUserContract: UpdateUserContract): Promise<ApiOneResponse<User>> {
        return this.userDatasource.update(id, updateUserContract)
    }
    remove(id: string): Promise<ApiOneResponse<User>> {
        return this.userDatasource.remove(id);
    }
}