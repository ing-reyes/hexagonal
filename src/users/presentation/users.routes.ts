import { Router } from "express";

import { UsersController } from "./users.controller";
import { UserDatasourceImpl } from "../infraestructure/datasources/users.datasource.impl";
import { UserRepositoryImpl } from "../infraestructure/repositories/users.repository.impl";

export class UsersRoutes {

    static get routes(): Router {
        const routes = Router();

        // Dependency Injection
        const usersDatasource = new UserDatasourceImpl()
        const usersReposotory = new UserRepositoryImpl(usersDatasource)
        const controller = new UsersController(usersReposotory);

        // localhost:3000/api/users
        routes.post('/', controller.create);
        routes.get('/', controller.findAll);
        routes.get('/:id', controller.findOne);
        routes.patch('/:id', controller.update);
        routes.delete('/:id', controller.remove);

        return routes;
    }
}