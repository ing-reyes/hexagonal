import { inject, injectable } from "inversify";

import { ApiAllResponse, ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { BcryptAdapter } from "../../../common/adapters/bcrypt.adapter";
import { CreateUserContract } from "../../domain/contracts/create-user.contract";
import { HttpStatus } from "../../../common/enums/http-status.enum";
import { KeysCache } from "../enums/keys-cache.enum";
import { Logger } from "../../../common/logging/logger";
import { ManagerError } from "../../../common/errors/manager.error";
import { PaginationContract } from "../../domain/contracts/pagination.contract";
import { redisClient } from "../../../data/redis/client-redis";
import { TYPES } from "../../../common/types/inversify.type";
import { UpdateUserContract } from "../../domain/contracts/update-user.contract";
import { User } from "../../domain/entities/user.entity";
import { UserDatasource } from "../../domain/datasources/user.datasource";
import { UserMapper } from "../mappers/user.mapper";
import { UserModel } from "../../../data/mongodb/models/user.model";
import { SaveLogger } from "../../../common/logging/save-logger";

@injectable()
export class UserDatasourceImpl implements UserDatasource {

    private readonly logger = new Logger(UserDatasourceImpl.name);
    private readonly saveLogger = new SaveLogger(UserDatasourceImpl.name);

    constructor(
        @inject(TYPES.BcryptAdapter)
        private readonly bcryptAdapter: BcryptAdapter,
    ){}

    private async saveToCache<T>(key: string, data: T, ttl: number): Promise<T> {
        try {
            await redisClient.set(key, JSON.stringify(data), { EX: ttl, NX: true });
            return data;
        } catch (error) {
            this.logger.error(`Failed to cache data for key: ${key}`);
            this.saveLogger.error(`Failed to cache data for key: ${key}`);
            throw error;
        }
    }

    async create(createUserContract: CreateUserContract): Promise<ApiOneResponse<User>> {
        try {

            // Check if user already exists
            const existingUser = await this.findOneByEmail(createUserContract.email);
            if (existingUser.data) {
                throw ManagerError.conflict('User already exists!');
            }

            const user = await UserModel.create({
                ...createUserContract,
                password: this.bcryptAdapter.hash(createUserContract.password),
            });

            if (!user) {
                throw ManagerError.conflict('User not created!');
            }

            await user.save()

            // Invalidate related caches
            await redisClient.del(KeysCache.ALL_USERS);

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
            if (error instanceof Error) {
                this.saveLogger.error(error.message);
                this.logger.error(error.message);
            }

            throw error;
        }
    }

    async findAll(paginationContract: PaginationContract): Promise<ApiAllResponse<User>> {
        const { page, limit } = paginationContract;
        const skip = (page - 1) * limit;

        try {
            const [users, total] = await Promise.all([
                UserModel.find({})
                    .skip(skip)
                    .limit(limit),
                UserModel.countDocuments(),
            ]);

            const lastPage = Math.ceil(total / limit);

            const response: ApiAllResponse<User> = {
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

            await this.saveToCache(KeysCache.ALL_USERS, response, 60 * 30); // Cache for 30 minutes

            return response;
        } catch (error) {
            if (error instanceof ManagerError) throw error;
            if (error instanceof Error) {
                this.saveLogger.error(error.message);
                this.logger.error(error.message);
            }

            throw error;
        }
    }

    async findOne(id: string): Promise<ApiOneResponse<User | null>> {
        try {

            const user = await UserModel.findById(id);
            const userMapper = user ? UserMapper.fromUserModelToEntity(user) : null;

            const response: ApiOneResponse<User | null> = {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: user ? userMapper : null,
            };

            if (user) {
                await this.saveToCache(`${KeysCache.USER_BY_ID}${userMapper?.id}`, response, 60 * 30); // Cache for 30 minutes
            }

            return response;
        } catch (error) {
            if (error instanceof ManagerError) throw error;
            if (error instanceof Error) {
                this.saveLogger.error(error.message);
                this.logger.error(error.message);
            }

            throw error;
        }
    }

    async findOneByEmail(email: string): Promise<ApiOneResponse<User | null>> {
        try {

            const user = await UserModel.findOne({email});
            const userMapper = user ? UserMapper.fromUserModelToEntity(user) : null;

            const response: ApiOneResponse<User | null> = {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: user ? userMapper : null,
            };

            if (user) {
                await this.saveToCache(`${KeysCache.USER_BY_ID}${userMapper?.id}`, response, 60 * 30); // Cache for 30 minutes
            }

            return response;
        } catch (error) {
            if (error instanceof ManagerError) throw error;
            if (error instanceof Error) {
                this.saveLogger.error(error.message);
                this.logger.error(error.message);
            }

            throw error;
        }
    }

    async update(id: string, updateUserContract: UpdateUserContract): Promise<ApiOneResponse<User>> {
        try {

            const existUser = await this.findOne(id);
            if (!existUser.data) {
                throw ManagerError.notFound('User not found!');
            }

            const user = await UserModel.findOneAndUpdate({ _id: id }, updateUserContract, { new: true });


            await user?.save();

            // Invalidate related caches
            await redisClient.del(KeysCache.ALL_USERS);
            await redisClient.del(`${KeysCache.USER_BY_ID}${user?.id}`);

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: UserMapper.fromUserModelToEntity(existUser.data),
            };
        } catch (error) {
            if (error instanceof ManagerError) throw error;
            if (error instanceof Error) {
                this.saveLogger.error(error.message);
                this.logger.error(error.message);
            }

            throw error;
        }
    }
    async remove(id: string): Promise<ApiOneResponse<User>> {
        try {

            const user = await UserModel.findOneAndDelete({ _id: id });
            if (!user) {
                throw ManagerError.notFound('User not found!');
            }

            // Invalidate related caches
            await redisClient.del(KeysCache.ALL_USERS);
            await redisClient.del(`${KeysCache.USER_BY_ID}${user.id}`);

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: 'OK',
                    error: null,
                },
                data: UserMapper.fromUserModelToEntity(user),
            };
        } catch (error) {
            if (error instanceof ManagerError) throw error;
            if (error instanceof Error) {
                this.saveLogger.error(error.message);
                this.logger.error(error.message);
            }

            throw error;
        }
    }
}