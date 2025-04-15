import { NextFunction, Request, Response } from "express";
import { inject, injectable } from "inversify";
import { JWTAdapter } from "../../../../common/adapters/jwt.adapter";
import { TYPES } from "../../../../common/types/inversify.type";
import { UserDatasource } from "../../../../users/domain/datasources/user.datasource";
import { UserMapper } from "../../../../users/infraestructure/mappers/user.mapper";
import { UserRole } from "../../../../users/domain/enums/user.role";
import { HttpStatus } from "../../../../common/enums/http-status.enum";

@injectable()
export class AuthMiddleware {

    constructor(
        @inject(TYPES.JWTAdapter)
        private readonly JwtAdapter: JWTAdapter,
        @inject(TYPES.UserDatasource)
        private readonly userDatasource: UserDatasource,
    ) { }

    validateJWT = async (req: Request, res: Response, next: NextFunction) => {
        const authorization = req.header('Authorization');

        if (!authorization) {
            res.status(401).json({ error: 'Missing authorization header' });
            return;
        }
        if (!authorization.startsWith('Bearer ')) {
            res.status(401).json({ error: 'Invalid authorization header' });
            return;
        }

        const token = authorization.split(' ').at(1) ?? '';
        try {

            const payload = await this.JwtAdapter.verifyToken<{ id: string, roles: UserRole[] }>(token);
            if (!payload) {
                res.status(401).json({ statusCode: HttpStatus.FORBIDDEN, statusMsg: 'FORBIDEN', error: 'Invalid token' });
                return;
            }

            const user = await this.userDatasource.findOne(payload.id)
            if (!user.data) {
                res.status(401).json({ statusCode: HttpStatus.BAD_REQUEST, statusMsg: 'BAD_REQUEST', error: 'User not found!' });
                return;
            }

            req.body.user = UserMapper.fromUserModelToEntity(user.data);

            next();
        } catch (error) {
            console.log(error);
            res.status(500).json({ statusCode: HttpStatus.INTERNAL_SERVER_ERROR, statusMsg: 'INTERNAL_SERVER_ERROR', error: 'Internal Server Error!' });
            return;
        }
    }

    validateRoles = (roles: UserRole[]) => {
        return (req: Request, res: Response, next: NextFunction) => {
            const user = req.body.user;
            if (!user) {
                res.status(401).json({ statusCode: HttpStatus.UNAUTHORIZED, statusMsg: 'UNAUTHORIZED', error: 'Unauthorized' });
                return;
            }

            const hasRole = roles.some(role => user.roles.includes(role));
            if (!hasRole) {
                res.status(403).json({ statusCode: HttpStatus.FORBIDDEN, statusMsg: 'FORBIDDEN', error: 'Forbiden!' });
                return;
            }

            next();
        }
    }
}