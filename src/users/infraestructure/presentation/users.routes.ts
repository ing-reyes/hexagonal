import { inject, injectable } from "inversify";
import { Router } from "express";
import { TYPES } from "../../../common/types/inversify.type";
import { UsersController } from "./users.controller";
import { UsersMiddleware } from "./middlewares/users.middleware";
import { ValidateIdMiddleware } from "../../../common/middlewares/validate-id.middleware";
import { logger } from "../../../common/logging/logger";


@injectable()
export class UsersRoutes {

    constructor(
        @inject(TYPES.UsersController)
        private readonly usersController: UsersController,
        @inject(TYPES.UsersMiddleware)
        private readonly usersMiddleware: UsersMiddleware,
        @inject(TYPES.ValidateIdMiddleware)
        private readonly validateIdMiddleware: ValidateIdMiddleware,
    ){}

    get routes(): Router {
        const routes = Router();

        //* Create user
        logger.log('POST /api/users', UsersRoutes.name)
        routes.post('/', 
            [this.usersMiddleware.validateCreateUse],
            this.usersController.create
        );
        
        //* Find all users
        logger.log('GET /api/users', UsersRoutes.name)
        routes.get('/', this.usersController.findAll);
        
        //* Find one user
        logger.log('GET /api/users/:id', UsersRoutes.name)
        routes.get('/:id', [
            this.validateIdMiddleware.isMongoId
            ],
            this.usersController.findOne,
        );
        
        //* Update user
        logger.log('PATCH /api/users/:id', UsersRoutes.name)
        routes.patch('/:id', [
                this.validateIdMiddleware.isMongoId, 
                this.usersMiddleware.validateUpdateUse
            ], 
            this.usersController.update,
        );
        
        //* Remove user
        logger.log('DELETE /api/users/:id', UsersRoutes.name)
        routes.delete('/:id', [
            this.validateIdMiddleware.isMongoId,
        ],
        this.usersController.remove);

        return routes;
    }
}