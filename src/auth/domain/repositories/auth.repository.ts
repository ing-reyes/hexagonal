import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { ResponseAuthContract } from "../contracts/response-auth.contract";
import { SignInContract } from "../contracts/sign-in.contract";
import { SignUpContract } from "../contracts/sign-up.contract";

export abstract class AuthRepository {
    abstract signIn(signIn: SignInContract): Promise<ApiOneResponse<ResponseAuthContract>>;
    abstract signUp(signUp: SignUpContract): Promise<ApiOneResponse<ResponseAuthContract>>;
    abstract refreshToken(token: string): Promise<string>;
}