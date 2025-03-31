import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { CORS } from './common/constants/cors';
import { RoutesFactory } from './routes.factory';
import { inject, injectable, unmanaged } from 'inversify';
import { TYPES } from './common/types/inversify.type';

interface Options {
    port: number;
}

@injectable()
export class Server {
    private readonly app: express.Application = express();
    private readonly port: number;

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
            console.log(`Server running on port ${this.port}`);
        }
        );
    }
}