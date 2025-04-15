import { Router } from "express";
import { inject, injectable } from "inversify";

import { AuthRoutes } from "./auth/infraestructure/presentation/auth.routes";
import { TYPES } from "./common/types/inversify.type";
import { UsersRoutes } from "./users/infraestructure/presentation/users.routes";

@injectable()
export class RoutesFactory {

    constructor(
        @inject(TYPES.UsersRoutes)
        private readonly usersRoutes: UsersRoutes,
        @inject(TYPES.AuthRoutes)
        private readonly authRoutes: AuthRoutes,
    ){}

    get routes(): Router {
        const routes = Router();
        
        //* Route: localhost:3000/api/users
        routes.use('/api/users', this.usersRoutes.routes);

        //* Route: localhost:3000/api/auth
        routes.use('/api/auth', this.authRoutes.routes);

        return routes;
    }
}