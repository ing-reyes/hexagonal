import 'dotenv/config';
import { config } from 'dotenv';
import { get } from 'env-var';

config({
    path: `.env.${process.env.NODE_ENV?.trim() ?? 'development'}`,
});

export const envs = {
    // Server
    PORT: get('PORT').required().asPortNumber(),
    NODE_ENV: get('NODE_ENV').required().asString(),
    HOSTNAME: get('HOSTNAME').required().asString(),
    
    // MongoDB
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_DB_USER: get('MONGO_DB_USER').required().asString(),
    MONGO_DB_PASSWORD: get('MONGO_DB_PASSWORD').required().asString(),
    MONGO_DB_URL: get('MONGO_DB_URL').required().asString(),
    MONGO_DB_HOST: get('MONGO_DB_HOST').required().asString(),
    MONGO_DB_PORT: get('MONGO_DB_PORT').required().asPortNumber(),

    // Redis
    REDIS_URL: get('REDIS_URL').required().asString(),
    
    // Security
    HASH_SALT: get('HASH_SALT').required().asInt(),

    // JWT
    JWT_SECRET: get('JWT_SECRET').required().asString(),
    JWT_EXPIRATION: get('JWT_EXPIRATION').required().asString(),
}