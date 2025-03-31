import { Router } from "express";
import { UsersRoutes } from './users/presentation/users.routes';
import { inject, injectable } from "inversify";
import { TYPES } from "./common/types/inversify.type";

@injectable()
export class RoutesFactory {

    constructor(
        @inject(TYPES.UsersRoutes)
        private readonly usersRoutes: UsersRoutes
    ){}

    get routes(): Router {
        const routes = Router();
        
        //* Route: localhost:3000/api/users
        routes.use('/api/users', this.usersRoutes.routes);

        return routes;
    }
}