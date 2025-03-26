import { Request, Response } from "express";

import { CreateUserUseCase } from "../application/use-cases/create-user.use-case";
import { CreateUserDto } from "../application/dtos/create-user.dto";
import { FindAllUsersUseCase } from "../application/use-cases/find-all-users.use-case";
import { FindOneUserUseCase } from "../application/use-cases/find-one-user.use-case";
import { Handler } from "../../common/errors/handler.error";
import { PaginationDto } from "../../common/dtos/pagination/pagination.dto";
import { RemoveUserUseCase } from "../application/use-cases/remove-user.use-case";
import { UpdateUserUseCase } from "../application/use-cases/update-user.use-case";
import { UpdateUserDto } from "../application/dtos/update-user.dto";
import { UserRepository } from "../domain/repositories/user.repository";


type HandlerError = (error: unknown, res: Response) => void;

export class UsersController {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly handlerError: HandlerError = Handler.error // Error Handler
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        // Use Case
        new CreateUserUseCase(this.userRepository).execute(createUserDto!)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }

    findAll = (req: Request, res: Response) => {
        const [error, paginationDto] = PaginationDto.validatePagination(req.query)
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        // Use Case
        new FindAllUsersUseCase(this.userRepository).execute(paginationDto!)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }

    findOne = (req: Request, res: Response) => {

        // Use Case
        new FindOneUserUseCase(this.userRepository).execute(req.params.id)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }

    update = (req: Request, res: Response) => {
        const [error, updateUserDto] = UpdateUserDto.update(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        // Use Case
        new UpdateUserUseCase(this.userRepository).execute(req.params.id, updateUserDto!)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }

    remove = (req: Request, res: Response) => {

        // Use Case
        new RemoveUserUseCase(this.userRepository).execute(req.params.id)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }
}