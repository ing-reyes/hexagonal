import { Request, Response } from "express";

import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { FindAllUsersUseCase } from "../application/use-cases/find-all-users.use-case";
import { FindOneUserUseCase } from "../application/use-cases/find-one-user.use-case";
import { Handler } from "../../common/errors/handler.error";
import { PaginationDto } from "../../common/dtos/pagination/pagination.dto";
import { RemoveUserUseCase } from "../application/use-cases/remove-user.use-case";
import { UpdateUserUseCase } from "../application/use-cases/update-user.use-case";
import { inject, injectable } from "inversify";
import { TYPES } from "../../common/types/inversify.type";



@injectable()
export class UsersController {

    constructor(
        @inject(TYPES.Handler)
        private readonly handlerError: Handler, // Error Handler
        @inject(TYPES.CreateUserUseCase)
        private readonly createUserUseCase: CreateUserUseCase,
        @inject(TYPES.FindAllUsersUseCase)
        private readonly findAllUsersUseCase: FindAllUsersUseCase,
        @inject(TYPES.FindOneUserUseCase)
        private readonly findOneUserUseCase: FindOneUserUseCase,
        @inject(TYPES.UpdateUserUseCase)
        private readonly updateUserUseCase: UpdateUserUseCase,
        @inject(TYPES.RemoveUserUseCase)
        private readonly removeUserUseCase: RemoveUserUseCase,
    ) { }

    create = (req: Request, res: Response) => {

        // Use Case
         this.createUserUseCase.execute(req.body.createUserDto)
            .then(users => res.json(users))
            .catch(error => this.handlerError.error(error, res));
    }

    findAll = (req: Request, res: Response) => {
        const [error, paginationDto] = PaginationDto.validatePagination(req.query)
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        // Use Case
        this.findAllUsersUseCase.execute(paginationDto!)
            .then(users => res.json(users))
            .catch(error => this.handlerError.error(error, res));
    }

    findOne = (req: Request, res: Response) => {

        // Use Case
        this.findOneUserUseCase.execute(req.params.id)
            .then(users => res.json(users))
            .catch(error => this.handlerError.error(error, res));
    }

    update = (req: Request, res: Response) => {
    
        // Use Case
        this.updateUserUseCase.execute( req.params.id, req.body.updateUserDto)
            .then(users => res.json(users))
            .catch(error => this.handlerError.error(error, res));
    }

    remove = (req: Request, res: Response) => {

        // Use Case
        this.removeUserUseCase.execute(req.params.id)
            .then(users => res.json(users))
            .catch(error => this.handlerError.error(error, res));
    }
}