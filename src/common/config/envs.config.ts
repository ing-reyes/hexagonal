import 'dotenv/config';
import { config } from 'dotenv';
import { get } from 'env-var';

config({
    path: `.env.${process.env.NODE_ENV?.trim() ?? 'development'}`,
});

export const envs = {
    PORT: get('PORT').required().asPortNumber(),
}