import { inject, injectable } from "inversify";
import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { ResponseAuthContract } from "../../domain/contracts/response-auth.contract";
import { SignInContract } from "../../domain/contracts/sign-in.contract";
import { SignUpContract } from "../../domain/contracts/sign-up.contract";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { HttpStatus } from "../../../common/enums/http-status.enum";
import { TYPES } from "../../../common/types/inversify.type";
import { ManagerError } from "../../../common/errors/manager.error";
import { BcryptAdapter } from '../../../common/adapters/bcrypt.adapter';
import { JWTAdapter } from '../../../common/adapters/jwt.adapter';
import { UserMapper } from "../../../users/infraestructure/mappers/user.mapper";
import { UserDatasource } from "../../../users/domain/datasources/user.datasource";
import { UserRole } from "../../../users/domain/enums/user.role";

@injectable()
export class AuthDatasourceImpl implements AuthDatasource {

    constructor(
        @inject(TYPES.BcryptAdapter)
        private readonly bcryptAdapter: BcryptAdapter,
        @inject(TYPES.JWTAdapter)
        private readonly JwtAdapter: JWTAdapter,
        @inject(TYPES.UserDatasource)
        private readonly userDatasource: UserDatasource,
    ) { }

    async signIn(signIn: SignInContract): Promise<ApiOneResponse<ResponseAuthContract>> {
        const { email, password } = signIn;
        try {
            const user = await this.userDatasource.findOneByEmail(email);
            if (!user.data) {
                throw ManagerError.badRequest("Credentials are invalid");
            }

            const userMapper = UserMapper.fromUserModelToEntity(user.data);

            const isPasswordValid = this.bcryptAdapter.compare(password, userMapper.password)
            if (!isPasswordValid) {
                throw ManagerError.badRequest("Credentials are invalid")
            }

            const payload = { id: user.data.id, roles: user.data.roles }
            const accessToken = await this.JwtAdapter.generateToken(payload);
            if (!accessToken) {
                throw ManagerError.internalServerError("Error generating token")
            }

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: "OK",
                    error: null
                },
                data: {
                    user: userMapper,
                    accessToken,
                }
            }
        } catch (error) {
            if (error instanceof ManagerError) {
                throw error;
            }
            throw ManagerError.internalServerError("Internal server error")
        }
    }
    async signUp(signUp: SignUpContract): Promise<ApiOneResponse<ResponseAuthContract>> {
        try {
            const user = await this.userDatasource.create(signUp);
            if (!user.data) {
                throw ManagerError.conflict("User not created!");
            }

            const payload = { id: user.data.id, roles: user.data.roles }
            const accessToken = await this.JwtAdapter.generateToken(payload);
            if (!accessToken) {
                throw ManagerError.internalServerError("Error generating token")
            }

            return {
                status: {
                    statusCode: HttpStatus.OK,
                    statusMsg: "OK",
                    error: null
                },
                data: {
                    user: user.data,
                    accessToken,
                }
            }
        } catch (error) {
            if (error instanceof ManagerError) {
                throw error;
            }
            throw ManagerError.internalServerError("Internal server error");
        }
    }
    async refreshToken(token: string): Promise<string> {
        try {
            const payload = await this.JwtAdapter.verifyToken<{id: string; roles: UserRole[]}>(token);

            if (!payload) {
                throw ManagerError.unauthorized("Unauthorized");
            }

            const user = await this.userDatasource.findOne(payload.id);
            if (!user.data) {
                throw ManagerError.unauthorized("Unauthorized");
            }

            const newToken = await this.JwtAdapter.generateToken({ id: user.data.id, roles: user.data.roles });
            if (!newToken) {
                throw ManagerError.internalServerError("Error generating token")
            }

            return newToken;
        } catch (error) {
            if (error instanceof ManagerError) {
                throw error;
            }
            throw ManagerError.internalServerError("Internal server error");
        }
    }
}