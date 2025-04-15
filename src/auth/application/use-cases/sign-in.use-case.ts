import { inject, injectable } from "inversify";
import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { ResponseAuthContract } from "../../domain/contracts/response-auth.contract";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { SignInDto } from "../dtos/sign-in.dto";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase{
    execute(signIn: SignInDto): Promise<ApiOneResponse<ResponseAuthContract>>;
}

@injectable()
export class SignInUseCase implements UseCase {

    constructor(
        @inject(TYPES.AuthRepository)
        private readonly authRepository: AuthRepository
    ) {}
    
    execute(signIn: SignInDto): Promise<ApiOneResponse<ResponseAuthContract>> {
        return this.authRepository.signIn(signIn);
    } 
}