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

        //* Create user
        routes.post('/', 
            [this.usersMiddleware.validateCreateUse],
            this.usersController.create
        );
        
        //* Find all users
        routes.get('/', this.usersController.findAll);
        
        //* Find one user
        routes.get('/:id', 
            //todo: add middleware to validate id
            this.usersController.findOne
        );
        
        //* Update user
        routes.patch('/:id',
            //todo: add middleware to validate id
            [this.usersMiddleware.validateUpdateUse], 
            this.usersController.update
        );
        
        //* Remove user
        routes.delete('/:id', this.usersController.remove);

        return routes;
    }
}