import jwt, { SignOptions } from 'jsonwebtoken';
import { envs } from '../config/envs.config';
import { injectable } from 'inversify';

const JWT_SECRET = envs.JWT_SECRET;
const JWT_EXPIRATION = envs.JWT_EXPIRATION;

@injectable()
export class JWTAdapter {
    // Generate a JWT token with a payload and an expiration time
    async generateToken(payload: Object, duration: string|number = JWT_EXPIRATION): Promise<string | null> {
        return new Promise((resolve) => {
            jwt.sign(payload, JWT_SECRET, { expiresIn: duration } as SignOptions, (error, token) => {
                if (error) return resolve(null);

                return resolve(token as string);
            });
        });
    }

    // Verify a JWT token and return the decoded payload
    async verifyToken<T>(token: string): Promise<T | null> {
        return new Promise((resolve) => {
            jwt.verify(token, JWT_SECRET, (error, decoded) => {
                if (error) return resolve(null);

                return resolve(decoded as T);
            });
        });
    }

    // Refresh a JWT token by verifying the old one and generating a new one
    async refresshToken(token: string): Promise<string | null> {
        const payload = await this.verifyToken<{ id: string }>(token);
        if (!payload) return Promise.resolve(null);

        return this.generateToken({ id: payload.id });
    }
}