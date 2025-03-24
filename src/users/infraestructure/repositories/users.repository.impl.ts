import { PaginationDto } from "../../../common/dtos/pagination/pagination.dto";
import { ApiAllResponse, ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { UsersDatasource } from "../../domain/datasources/users.datasource";
import { CreateUserDto } from "../../domain/dtos/create-user.dto";
import { UpdateUserDto } from "../../domain/dtos/update-user.dto";
import { User } from "../../domain/entities/user.entity";
import { UsersRepository } from "../../domain/repositories/users.repository";

export class UsersRepositoryImpl implements UsersRepository {

    constructor(
        private readonly usersDatasource: UsersDatasource,
    ) { }

    create(createUserDto: CreateUserDto): Promise<ApiOneResponse<User>> {
        return this.usersDatasource.create(createUserDto);
    }
    findAll(paginationDto: PaginationDto): Promise<ApiAllResponse<User>> {
        return this.usersDatasource.findAll(paginationDto);
    }
    findOne(id: string): Promise<ApiOneResponse<User | null>> {
        return this.usersDatasource.findOne(id);
    }
    update(id: string, updateUserDto: UpdateUserDto): Promise<ApiOneResponse<User>> {
        return this.usersDatasource.update(id, updateUserDto)
    }
    remove(id: string): Promise<ApiOneResponse<User>> {
        return this.usersDatasource.remove(id);
    }
}