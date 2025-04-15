import { inject, injectable } from "inversify";
import { AuthRepository } from "../../domain/repositories/auth.repository";
import { TYPES } from "../../../common/types/inversify.type";

interface UseCase{
    execute(token: string): Promise<string>;
}

@injectable()
export class RefresshTokenUseCase implements UseCase {

    constructor(
        @inject(TYPES.AuthRepository)
        private readonly authRepository: AuthRepository
    ) {}
    
    execute(token: string): Promise<string> {
        return this.authRepository.refreshToken(token);
    } 
}