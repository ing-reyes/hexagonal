import { NextFunction, Request, Response } from "express";
import { CreateUserDto } from "../../application/dtos/create-user.dto";
import { UpdateUserDto } from "../../application/dtos/update-user.dto";
import { injectable } from "inversify";

@injectable()
export class UsersMiddleware {
    validateCreateUse = (req: Request, res: Response, next: NextFunction) => {
        const [error, createUserDto] = CreateUserDto.create(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        req.body.createUserDto = createUserDto;

        next()

    }

    validateUpdateUse = (req: Request, res: Response, next: NextFunction) => {
        const [error, updateUserDto] = UpdateUserDto.update(req.body);
        if (error) {
            res.status(400).json({ statusCode: 400, message: error, statusMsg: 'BAD_REQUEST' });
            return;
        }

        req.body.updateUserDto = updateUserDto;

        next()

    }
}