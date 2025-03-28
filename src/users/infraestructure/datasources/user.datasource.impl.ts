import { ApiAllResponse, ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { CreateUserContract } from "../../domain/contracts/create-user.contract";
import { HttpStatus } from "../../../common/enums/http-status.enum";
import { ManagerError } from "../../../common/errors/manager.error";
import { PaginationContract } from "../../domain/contracts/pagination.contract";
import { UpdateUserContract } from "../../domain/contracts/update-user.contract";
import { User } from "../../domain/entities/user.entity";
import { UserRole } from "../../domain/enums/user.role";
import { UserDatasource } from "../../domain/datasources/user.datasource";

export class UserDatasourceImpl implements UserDatasource {
    private readonly users: User[] = [
        { id: '1', name: 'User 1', email: 'user1@gmail.com', password: '123456', roles: [UserRole.USER] },
        { id: '2', name: 'User 2', email: 'user2@gmail.com', password: '123456', roles: [UserRole.USER] },
        { id: '3', name: 'User 3', email: 'user3@gmail.com', password: '123456', roles: [UserRole.USER] },
        { id: '4', name: 'User 4', email: 'user4@gmail.com', password: '123456', roles: [UserRole.ADMIN] },
        { id: '5', name: 'User 5', email: 'user5@gmail.com', password: '123456', roles: [UserRole.USER] },
        { id: '6', name: 'User 6', email: 'user6@gmail.com', password: '123456', roles: [UserRole.USER] },
    ];

    async create(createUserContract: CreateUserContract): Promise<ApiOneResponse<User>> {
        try {
            const user = { ...createUserContract, id: (this.users.length + 1).toString(), roles: [UserRole.USER] };
            this.users.push(user);
            
            return {
                status: {
                    statusCode: HttpStatus.CREATED,
                    statusMsg: 'CREATED',
                    error: null,
                },
                data: user,
            }
        } catch (error) {
            if (error instanceof ManagerError) throw error;

            throw ManagerError.internalServerError();
        }
    }

    async findAll(paginationContract: PaginationContract): Promise<ApiAllResponse<User>> {
        const { page, limit } = paginationContract;
        try {
            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                meta: {
                    lastPage: 1,
                    page: page,
                    limit: limit,
                    total: 6,
                },
                data: this.users,
            };
        } catch (error) {
            if (error instanceof ManagerError) throw error;

            throw ManagerError.internalServerError();
        }
    }

    async findOne(id: string): Promise<ApiOneResponse<User | null>> {
        try {
            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: this.users.find(user => user.id === id) || null,
            };
        } catch (error) {
            if (error instanceof Error) throw error;

            throw ManagerError.internalServerError();
        }
    }

    async update(id: string, updateUserContract: UpdateUserContract): Promise<ApiOneResponse<User>> {
        throw new Error("Method not implemented.");
    }
    async remove(id: string): Promise<ApiOneResponse<User>> {
        try {
            
            const user = this.users.find(user => user.id === id);
            if (!user) throw ManagerError.notFound('User not found');

            this.users.splice(this.users.indexOf(user), 1);

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: user,
            };
        } catch (error) {
            if (error instanceof Error) throw error;

            throw ManagerError.internalServerError();
        }
    }
}