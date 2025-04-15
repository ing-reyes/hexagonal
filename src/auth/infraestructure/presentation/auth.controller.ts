import { inject, injectable } from "inversify";
import { RefresshTokenUseCase } from "../../application/use-cases/refress-token.use-case";
import { SignInUseCase } from "../../application/use-cases/sign-in.use-case";
import { TYPES } from "../../../common/types/inversify.type";
import { SignUpUseCase } from "../../application/use-cases/sign-up.use-case";
import { Handler } from "../../../common/errors/handler.error";
import { Request, Response } from "express";

@injectable()
export class AuthController {
    constructor(
        @inject(TYPES.Handler)
        private readonly Handler: Handler,
        @inject(TYPES.SignInUseCase)
        private readonly signInUseCase: SignInUseCase,
        @inject(TYPES.SignUpUseCase)
        private readonly signUpUseCase: SignUpUseCase,
        @inject(TYPES.RefresshTokenUseCase)
        private readonly refressTokenUseCase: RefresshTokenUseCase,
    ){}

    signIn = (req: Request, res: Response) => {
        
        // Use Case
        this.signInUseCase.execute( req.body.signIn )
        .then((user)=>res.status(200).json(user))
        .catch((error)=>this.Handler.error(error, res))
    }

    signUp = (req: Request, res: Response) => {
        
        // Use Case
        this.signUpUseCase.execute( req.body.signUp )
        .then((user)=>res.status(200).json(user))
        .catch((error)=>this.Handler.error(error, res))
    }

    refresshToken = (req: Request, res: Response) => {
        
        // Use Case
        this.refressTokenUseCase.execute( req.body.token )
        .then((user)=>res.status(200).json(user))
        .catch((error)=>this.Handler.error(error, res))
    }
}