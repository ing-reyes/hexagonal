export const TYPES = {
    //* Users
    UserDatasource: Symbol.for("UserDatasource"),
    UserRepository: Symbol.for("UserRepository"),
    CreateUserUseCase: Symbol.for("CreateUserUseCase"),
    FindAllUsersUseCase: Symbol.for("FindAllUsersUseCase"),
    FindOneUserUseCase: Symbol.for("FindOneUserUseCase"),
    UpdateUserUseCase: Symbol.for("UpdateUserUseCase"),
    RemoveUserUseCase: Symbol.for("RemoveUserUseCase"),
    UsersController: Symbol.for("UsersController"),
    UsersRoutes: Symbol.for("UsersRoutes"),
    Handler: Symbol.for("Handler"),
    CreateUserDto: Symbol.for("CreateUserDto"),
    UpdateUserDto: Symbol.for("UpdateUserDto"),
    PaginationDto: Symbol.for("PaginationDto"),
    RoutesFactory: Symbol.for("RoutesFactory"),
    Server: Symbol.for("Server"),
    UsersMiddleware: Symbol.for("UsersMiddleware"),
    MongoDB: Symbol.for("MongoDB"),
    ValidateIdMiddleware: Symbol.for("ValidateIdMiddleware"),
    UsersCacheMiddleware: Symbol.for("UsersCacheMiddleware"),
    BcryptAdapter: Symbol.for("BcryptAdapter"),
    
    //* Auth
    SignInUseCase: Symbol.for("SignInUseCase"),
    SignUpUseCase: Symbol.for("SignUpUseCase"),
    RefresshTokenUseCase: Symbol.for("RefresshTokenUseCase"),
    AuthDatasource: Symbol.for("AuthDatasource"),
    AuthDatasourceImpl: Symbol.for("AuthDatasourceImpl"),
    AuthRepository: Symbol.for("AuthRepository"),
    AuthRepositoryImpl: Symbol.for("AuthRepositoryImpl"),
    AuthController: Symbol.for("AuthController"),
    AuthRoutes: Symbol.for("AuthRoutes"),
    AuthMiddleware: Symbol.for("AuthMiddleware"),
    JWTAdapter: Symbol.for("JWTAdapter"),
    ValidateAuthMiddleware: Symbol.for("ValidateAuthMiddleware"),
}