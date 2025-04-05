import 'dotenv/config';
import { config } from 'dotenv';
import { get } from 'env-var';

config({
    path: `.env.${process.env.NODE_ENV?.trim() ?? 'development'}`,
});

export const envs = {
    PORT: get('PORT').required().asPortNumber(),

    // MongoDB
    MONGO_DB_NAME: get('MONGO_DB_NAME').required().asString(),
    MONGO_DB_URL: get('MONGO_DB_URL').required().asString(),
}