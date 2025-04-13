import { NextFunction, Request, Response } from "express";
import { redisClient } from "../../../../data/redis/client-redis";
import { injectable } from "inversify";
import { KeysCache } from "../../enums/keys-cache.enum";

@injectable()
export class UsersCacheMiddleware {
    async findAll(req: Request, res: Response, next: NextFunction) {

        const cacheKey = KeysCache.ALL_USERS;
        const cachedUser = await redisClient.get(cacheKey);

        if (cachedUser) {
            res.status(200).json(JSON.parse(cachedUser));
            return;
        }

        next();
    }

    async findOne(req: Request, res: Response, next: NextFunction) {

        const cacheKey = `${KeysCache.USER_BY_ID}${req.params.id}`;
        const cachedUser = await redisClient.get(cacheKey);

        if (cachedUser) {
            res.status(200).json(JSON.parse(cachedUser));
            return;
        }

        next();
    }
}