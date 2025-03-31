import { inject, injectable } from "inversify";
import { Router } from "express";
import { TYPES } from "../../common/types/inversify.type";
import { UsersController } from "./users.controller";
import { UsersMiddleware } from "./middlewares/users.middleware";


@injectable()
export class UsersRoutes {

    constructor(
        @inject(TYPES.UsersController)
        private readonly usersController: UsersController,
        @inject(TYPES.UsersMiddleware)
        private readonly usersMiddleware: UsersMiddleware,
    ){}

    get routes(): Router {
        const routes = Router();

        // localhost:3000/api/users
        routes.post('/', 
            [this.usersMiddleware.validateCreateUse],
            this.usersController.create
        );
        
        routes.get('/', this.usersController.findAll);
        
        routes.get('/:id', this.usersController.findOne);
        
        routes.patch('/:id',
            [this.usersMiddleware.validateUpdateUse], 
            this.usersController.update
        );
        
        routes.delete('/:id', this.usersController.remove);

        return routes;
    }
}