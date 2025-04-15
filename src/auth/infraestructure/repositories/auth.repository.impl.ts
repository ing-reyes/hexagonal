import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { AuthDatasource } from "../../domain/datasources/auth.datasource";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { ResponseAuthContract } from "../../domain/contracts/response-auth.contract";
import { SignInContract } from "../../domain/contracts/sign-in.contract";
import { SignUpContract } from "../../domain/contracts/sign-up.contract";
import { inject, injectable } from "inversify";
import { TYPES } from "../../../common/types/inversify.type";

@injectable()
export class AuthRepositoryImpl implements AuthRepository {
    constructor(
        @inject(TYPES.AuthDatasource)
        private readonly authDatasource: AuthDatasource,
    ){}

    signIn(signIn: SignInContract): Promise<ApiOneResponse<ResponseAuthContract>> {
        return this.authDatasource.signIn(signIn);
    }
    signUp(signUp: SignUpContract): Promise<ApiOneResponse<ResponseAuthContract>> {
        return this.authDatasource.signUp(signUp);
    }
    refreshToken(token: string): Promise<string> {
        return this.authDatasource.refreshToken(token);
    }
}