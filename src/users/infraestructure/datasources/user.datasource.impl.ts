import { ApiAllResponse, ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { CreateUserContract } from "../../domain/contracts/create-user.contract";
import { HttpStatus } from "../../../common/enums/http-status.enum";
import { ManagerError } from "../../../common/errors/manager.error";
import { PaginationContract } from "../../domain/contracts/pagination.contract";
import { UpdateUserContract } from "../../domain/contracts/update-user.contract";
import { User } from "../../domain/entities/user.entity";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { injectable } from "inversify";
import { UserModel } from "../../../data/mongodb/models/user.model";
import { UserMapper } from "../mappers/user.mapper";
import { Logger } from "../../../common/logging/logger";

@injectable()
export class UserDatasourceImpl implements UserDatasource {

    private readonly logger = new Logger(UserDatasourceImpl.name);

    async create(createUserContract: CreateUserContract): Promise<ApiOneResponse<User>> {
        try {
            const user = await UserModel.create(createUserContract);

            if (!user) {
                throw ManagerError.conflict('User not created!');
            }

            await user.save()

            return {
                status: {
                    statusCode: HttpStatus.CREATED,
                    statusMsg: 'CREATED',
                    error: null,
                },
                data: UserMapper.fromUserModelToEntity(user),
            }
        } catch (error) {
            if (error instanceof ManagerError) throw error;

            this.logger.error(error);
            throw ManagerError.internalServerError();
        }
    }

    async findAll(paginationContract: PaginationContract): Promise<ApiAllResponse<User>> {
        const { page, limit } = paginationContract;
        const skip = (page - 1) * limit;

        const [users, total] = await Promise.all([
            UserModel.find({})
                .skip(skip)
                .limit(limit),
            UserModel.countDocuments(),
        ]);

        const lastPage = Math.ceil(total / limit);

        try {
            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                meta: {
                    lastPage: lastPage,
                    page: page,
                    limit: limit,
                    total: total,
                },
                data: users.map(UserMapper.fromUserModelToEntity),
            };
        } catch (error) {
            if (error instanceof ManagerError) throw error;

            this.logger.error(error);
            throw ManagerError.internalServerError();
        }
    }

    async findOne(id: string): Promise<ApiOneResponse<User | null>> {
        try {

            const user = await UserModel.findById(id);

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: user ? UserMapper.fromUserModelToEntity(user) : null,
            };
        } catch (error) {
            if (error instanceof Error) throw error;

            this.logger.error(error);
            throw ManagerError.internalServerError();
        }
    }

    async update(id: string, updateUserContract: UpdateUserContract): Promise<ApiOneResponse<User>> {
        try {

            const existUser = await this.findOne(id);
            if(!existUser.data){
                throw ManagerError.notFound('User not found!');
            }
            
            const user = await UserModel.findOneAndUpdate( { _id: id }, updateUserContract, { new: true });
            

            await user?.save();
            
            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: UserMapper.fromUserModelToEntity(existUser.data),
            };
        } catch (error) {
            if (error instanceof Error) throw error;

            this.logger.error(error);
            throw ManagerError.internalServerError();
        }
    }
    async remove(id: string): Promise<ApiOneResponse<User>> {
        try {

            const user = await UserModel.findOneAndDelete({ _id: id });
            if(!user){
                throw ManagerError.notFound('User not found!');
            }

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: UserMapper.fromUserModelToEntity(user),
            };
        } catch (error) {
            if (error instanceof Error) throw error;

            this.logger.error(error);
            throw ManagerError.internalServerError();
        }
    }
}