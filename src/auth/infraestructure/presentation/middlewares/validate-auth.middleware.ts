import { NextFunction, Request, Response } from "express";
import { SignInDto } from "../../../application/dtos/sign-in.dto";
import { SignUpDto } from "../../../application/dtos/sign-up.dto";
import { injectable } from "inversify";

@injectable()
export class ValidateAuthMiddleware {

    validateSignIn = (req: Request, res: Response, next: NextFunction) => {
        
        const [error, signIn] = SignInDto.signIn(req.body)

        if (error) {
            res.status(400).json({ message: error });
            return;
        }

        req.body.signIn = signIn;

        next();
    };

    validateSignUp = (req: any, res: any, next: any) => {
        const [error, signUp] = SignUpDto.signUp(req.body)

        if (error) {
            res.status(400).json({ message: error });
            return;
        }

        req.body.signUp = signUp;

        next();
    };

    validateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
        const token = req.header('Authorization')?.split(' ')[1];

        if (!token) {
            res.status(401).json({ message: 'Missing authorization header' });
            return;
        }

        req.body.token = token;

        next();
    };
}