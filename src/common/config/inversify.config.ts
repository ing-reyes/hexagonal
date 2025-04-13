import 'reflect-metadata';

import { Container }  from 'inversify';
import { UserDatasource } from '../../users/domain/datasources/user.datasource';
import { UserDatasourceImpl } from '../../users/infraestructure/datasources/user.datasource.impl';
import { TYPES } from '../types/inversify.type';
import { UserRepository } from '../../users/domain/repositories/user.repository';
import { UserRepositoryImpl } from '../../users/infraestructure/repositories/user.repository.impl';
import { CreateUserUseCase } from '../../users/application/use-cases/create-user.use-case';
import { FindAllUsersUseCase } from '../../users/application/use-cases/find-all-users.use-case';
import { FindOneUserUseCase } from '../../users/application/use-cases/find-one-user.use-case';
import { UpdateUserUseCase } from '../../users/application/use-cases/update-user.use-case';
import { RemoveUserUseCase } from '../../users/application/use-cases/remove-user.use-case';
import { UsersController } from '../../users/infraestructure/presentation/users.controller';
import { UsersRoutes } from '../../users/infraestructure/presentation/users.routes';
import { RoutesFactory } from '../../routes.factory';
import { envs } from './envs.config';
import { Handler } from '../errors/handler.error';
import { Server } from '../../server';
import { UsersMiddleware } from '../../users/infraestructure/presentation/middlewares/users.middleware';
import { MongoDB } from '../../data/mongodb/mongo-db';
import { ValidateIdMiddleware } from '../middlewares/validate-id.middleware';
import { ValidatorsAdapter } from '../adapters/validators.adapter';
import { UsersCacheMiddleware } from '../../users/infraestructure/presentation/middlewares/users-cache.middleware';
import { BcryptAdapter } from '../adapters/bcrypt.adapter';

const container = new Container();

//* ------------------START USERS-----------------------------------------------------
// Datasources and Repositories
container.bind<UserDatasource>(TYPES.UserDatasource).to(UserDatasourceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImpl);

// Users use cases
container.bind<CreateUserUseCase>(TYPES.CreateUserUseCase).to(CreateUserUseCase);
container.bind<FindAllUsersUseCase>(TYPES.FindAllUsersUseCase).to(FindAllUsersUseCase);
container.bind<FindOneUserUseCase>(TYPES.FindOneUserUseCase).to(FindOneUserUseCase);
container.bind<UpdateUserUseCase>(TYPES.UpdateUserUseCase).to(UpdateUserUseCase);
container.bind<RemoveUserUseCase>(TYPES.RemoveUserUseCase).to(RemoveUserUseCase);

container.bind<UsersController>(TYPES.UsersController).to(UsersController);
container.bind<UsersRoutes>(TYPES.UsersRoutes).to(UsersRoutes);
container.bind<RoutesFactory>(TYPES.RoutesFactory).to(RoutesFactory);

// Middlewares
container.bind<UsersMiddleware>(TYPES.UsersMiddleware).to(UsersMiddleware);
container.bind<UsersCacheMiddleware>(TYPES.UsersCacheMiddleware).to(UsersCacheMiddleware);


//*------------------------END USERS---------------------------------------------------------

//*------------------------START COMMON---------------------------------------------------------


container.bind<ValidateIdMiddleware>(TYPES.ValidateIdMiddleware).to(ValidateIdMiddleware);
container.bind<ValidatorsAdapter>(TYPES.ValidatorsAdapter).to(ValidatorsAdapter);
container.bind<Handler>(TYPES.Handler).to(Handler);

//*------------------------END COMMON---------------------------------------------------------

//*------------------------START DATABASE---------------------------------------------------------

// Databases
// MongoDB
container.bind<MongoDB>(TYPES.MongoDB).to(MongoDB);

//*------------------------END DATABASE---------------------------------------------------------

//*------------------------START CONFIG---------------------------------------------------------
container.bind<BcryptAdapter>(TYPES.BcryptAdapter).to(BcryptAdapter);
//*------------------------END CONFIG-----------------------------------------------------------

// Register the server
container.bind<Server>(TYPES.Server).toDynamicValue(() => {
    return new Server({ port: envs.PORT }, container.get<RoutesFactory>(TYPES.RoutesFactory));
});

// ... (otros bindings de DTOs si los usas a nivel de inyección)
// container.bind<CreateUserDto>(TYPES.CreateUserDto).to(CreateUserDto);
// container.bind<UpdateUserDto>(TYPES.UpdateUserDto).to(UpdateUserDto);
// container.bind<PaginationDto>(TYPES.PaginationDto).to(PaginationDto);


export { container };