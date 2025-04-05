import { NextFunction, Request, Response } from "express";
import { ValidatorsAdapter } from "../adapters/validators.adapter";
import { inject, injectable } from "inversify";
import { TYPES } from "../types/inversify.type";

@injectable()
export class ValidateIdMiddleware {
    constructor(
        @inject(TYPES.ValidatorsAdapter)
        private readonly validatorsAdapter: ValidatorsAdapter,
    ){}

    isMongoId = ( req: Request, res: Response, next: NextFunction )=>{
        if( !this.validatorsAdapter.isMongoId(req.params.id) ){
            res.status(400).json({statusCode: 400, message: 'Mongo id invalid', statusMsg: 'BAD_REQUEST'})
            return;
        }

        next();
    }

    isNumberId = ( req: Request, res: Response, next: NextFunction )=>{
        if( !this.validatorsAdapter.isNumberId(req.params.id) ){
            res.status(400).json({statusCode: 400, message: 'Id must be a number', statusMsg: 'BAD_REQUEST'})
            return;
        }

        next();
    }
}