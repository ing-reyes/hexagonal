import { AppRoutes } from './routes';
import { envs } from './common/config/envs.config';
import { Server }  from './server';

function bootstrap() {
    
    new Server({
        port: envs.PORT,
        routes: AppRoutes.routes,
    }).start();
}

bootstrap();