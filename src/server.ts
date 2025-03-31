import os from 'os';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { CORS } from './common/constants/cors';
import { RoutesFactory } from './routes.factory';
import { inject, injectable, unmanaged } from 'inversify';
import { TYPES } from './common/types/inversify.type';
import { Logger } from './common/logging/logger';

interface Options {
    port: number;
}

@injectable()
export class Server {
    private readonly app: express.Application = express();
    private readonly port: number;
    private readonly logger = new Logger(Server.name)

    constructor(
        @unmanaged()
        private readonly options: Options,
        @inject(TYPES.RoutesFactory)
        private readonly routesFactory: RoutesFactory,
    ) {
        const { port } = options;
        this.port = port;
    }

    start() {
        //* Enable Cors
        this.app.use(cors(CORS));

        //* Middlewares
        this.app.use(morgan('dev')); // Log requests to the console
        this.app.use(express.json()); // Parse JSON request body
        this.app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request body

        //* Load routes factory
        this.app.use(this.routesFactory.routes); // Load all routes

        //* Start server
        this.app.listen(this.port, () => {
            this.logger.log(`Application running on port ${this.port}`);
            this.logger.log(`Application running in ${process.env.NODE_ENV?.trim()} mode`);
            this.logger.log(`Application base URL: ${this.baseUrl()}`);
        }
        );
    }

    private baseUrl(){
        const protocol = process.env.NODE_ENV?.trim() === 'production' ? 'https' : 'http';
        const hostname = os.hostname(); // Get the hostname of the operating system

        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return `${protocol}://${hostname}:${this.port}`;
        }

        // If it's not localhost, assume it's a production domain.
        // If you have a specific domain, you can use process.env.DOMAIN or similar.
        return `${protocol}://${hostname}:${this.port}`;
    }
}