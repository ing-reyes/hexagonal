import { container } from './common/config/inversify.config';
import { TYPES } from './common/types/inversify.type';
import { Server } from './server';

function bootstrap() {
    const server = container.get<Server>(TYPES.Server);
    
    server.start();
}

bootstrap();