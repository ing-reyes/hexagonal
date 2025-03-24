import { Request, Response } from "express";

import { CreateUser } from "../application/create-user.use-case";
import { CreateUserDto } from "../domain/dtos/create-user.dto";
import { FindAllUsers } from "../application/find-all-users.use-case";
import { FindOneUser } from "../application/find-one-user.use-case";
import { Handler } from "../../common/errors/handler.error";
import { PaginationDto } from "../../common/dtos/pagination/pagination.dto";
import { RemoveUser } from "../application/remove-user.use-case";
import { UpdateUser } from "../application/update-user.use-case";
import { UpdateUserDto } from "../domain/dtos/update-user.dto";
import { UsersRepository } from "../domain/repositories/users.repository";

type HandlerError = (error: unknown, res: Response) => void;

export class UsersController {

    constructor(
        private readonly usersRepository: UsersRepository,
        private readonly handlerError: HandlerError = Handler.error // Error Handler
    ) { }

    create = (req: Request, res: Response) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        // Use Case
        new CreateUser(this.usersRepository).execute(createUserDto!)
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
        new FindAllUsers(this.usersRepository).execute(paginationDto!)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }

    findOne = (req: Request, res: Response) => {

        // Use Case
        new FindOneUser(this.usersRepository).execute(req.params.id)
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
        new UpdateUser(this.usersRepository).execute(req.params.id, updateUserDto!)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }

    remove = (req: Request, res: Response) => {

        // Use Case
        new RemoveUser(this.usersRepository).execute(req.params.id)
            .then(users => res.json(users))
            .catch(error => this.handlerError(error, res));
    }
}