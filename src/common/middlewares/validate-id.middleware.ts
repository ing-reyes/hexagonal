import { NextFunction, Request, Response } from "express";
import { injectable } from "inversify";
import { ValidatorsAdapter } from "../adapters/validators.adapter";
import { HttpStatus } from "../enums/http-status.enum";

@injectable()
export class ValidateIdMiddleware {

    isMongoId = ( req: Request, res: Response, next: NextFunction )=>{
        if( !ValidatorsAdapter.isMongoId(req.params.id) ){
            res.status(400).json({statusCode: HttpStatus.BAD_REQUEST, statusMsg: 'BAD_REQUEST', error: 'Mongo id invalid'})
            return;
        }

        next();
    }

    isNumberId = ( req: Request, res: Response, next: NextFunction )=>{
        if( !ValidatorsAdapter.isNumberId(req.params.id) ){
            res.status(400).json({statusCode: 400, message: 'Id must be a number', statusMsg: 'BAD_REQUEST'})
            return;
        }

        next();
    }
}