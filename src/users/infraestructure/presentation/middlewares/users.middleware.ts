import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../../application/dtos/create-user.dto";
import { UpdateUserDto } from "../../../application/dtos/update-user.dto";
import { injectable } from "inversify";

@injectable()
export class UsersMiddleware {
    validateCreateUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, statusMsg: 'BAD_REQUEST', error: error });
            return;
        }

        //* Add the createUserDto to the request body for later use in the controller
        req.body.createUserDto = createUserDto;

        next()

    }

    validateUpdateUser = (req: Request, res: Response, next: NextFunction) => {
        const [error, updateUserDto] = UpdateUserDto.update(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, statusMsg: 'BAD_REQUEST', error: error });
            return;
        }

        //* Add the updateUserDto to the request body for later use in the controller
        req.body.updateUserDto = updateUserDto;

        next()

    }
}