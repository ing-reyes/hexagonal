import { Router } from "express";
import { inject, injectable } from "inversify";

import { AuthController } from "./auth.controller";
import { TYPES } from "../../../common/types/inversify.type";
import { ValidateAuthMiddleware } from "./middlewares/validate-auth.middleware";
import { logger } from "../../../common/logging/logger";

@injectable()
export class AuthRoutes {

    constructor(
        @inject(TYPES.AuthController)
        private readonly authController: AuthController,
        @inject(TYPES.ValidateAuthMiddleware)
        private readonly validateAuthMiddleware: ValidateAuthMiddleware,
    ){}

    get routes(): Router{
        const routes = Router();

        logger.log('POST /api/auth/sign-in', AuthRoutes.name)
        routes.post("/sign-in",[
                this.validateAuthMiddleware.validateSignIn
            ], 
            this.authController.signIn
        );
        
        logger.log('POST /api/auth/sign-up', AuthRoutes.name)
        routes.post("/sign-up",[
                this.validateAuthMiddleware.validateSignUp
            ], 
            this.authController.signUp
        );

        logger.log('POST /api/auth/refressh-token', AuthRoutes.name)
        routes.post("/refressh-token",[
                this.validateAuthMiddleware.validateRefreshToken,
            ], 
            this.authController.refresshToken
        );

        return routes;
    }
}