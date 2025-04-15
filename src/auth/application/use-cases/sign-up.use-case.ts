import { inject, injectable } from "inversify";
import { ApiOneResponse } from "../../../common/interfaces/api-response.interface";
import { ResponseAuthContract } from "../../domain/contracts/response-auth.contract";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { SignUpDto } from "../dtos/sign-up.dto";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase{
    execute(signUp: SignUpDto): Promise<ApiOneResponse<ResponseAuthContract>>;
}

@injectable()
export class SignUpUseCase implements UseCase {

    constructor(
        @inject(TYPES.AuthRepository)
        private readonly authRepository: AuthRepository
    ) {}
    
    execute(signUp: SignUpDto): Promise<ApiOneResponse<ResponseAuthContract>> {
        return this.authRepository.signUp(signUp);
    } 
}