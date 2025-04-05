import { envs } from './common/config/envs.config';
import { container } from './common/config/inversify.config';
import { TYPES } from './common/types/inversify.type';
import { MongoDB } from './data/mongodb/mongo-db';
import { Server } from './server';

async function bootstrap() {

    //* Initialize the Database
    const mongoDB = container.get<MongoDB>(TYPES.MongoDB);
    await mongoDB.connect({ 
        mongoUrl: envs.MONGO_DB_URL, 
        dbName: envs.MONGO_DB_NAME 
    });

    //* Initialize the server
    const server = container.get<Server>(TYPES.Server);
    server.start();
}

bootstrap();