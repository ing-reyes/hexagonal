import express, { Router } from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { CORS } from './common/constants/cors';

interface Options {
    port: number;
    routes: Router;
}

export class Server {
    private readonly app: express.Application = express();
    private readonly routes: Router;
    private readonly port: number;

    constructor(
        private readonly options: Options,
    ) {
        const { port, routes } = options;
        this.routes = routes;
        this.port = port;
    }

    start() {
        // Cors
        this.app.use(cors(CORS));
        
        // Middleware
        this.app.use(morgan('dev'));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        // Routes
        this.app.use(this.routes);

        // Start server
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${this.port}`);
        }
        );
    }
}