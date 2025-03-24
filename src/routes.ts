import { Router } from "express";
import { UsersRoutes } from "./users/presentation/users.routes";

export class AppRoutes {

    static get routes(): Router {
        const routes = Router();

        routes.use('/api/users', UsersRoutes.routes);

        return routes;
    }
}