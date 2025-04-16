import { addErrorDto } from "../../../common/errors/add.error"
import { UserRole } from "../../domain/enums/user.role";

export class UpdateUserDto {
    private constructor(
        public name?: string,
        public email?: string,
        public password?: string,
        public roles?: UserRole[],
    ) {}

    static update( object: {[key:string]:any} ): [Record<string, string[]>?, UpdateUserDto?]{
        const { name, email, password, roles } = object

        let errors: Record<string, string[]> = {}

        if( name !== undefined && name.length == 0 ) {
            errors = addErrorDto('name', 'name cannot be empty', errors);
        }
        
        if( email !== undefined && email.length == 0 ) {
            errors = addErrorDto('email', 'email cannot be empty', errors);
        }
        
        if( password !== undefined && password.length == 0 ) {
            errors = addErrorDto('password', 'password cannot be empty', errors);
        }

        if (roles !== undefined && !roles.every((role: UserRole) => Object.values(UserRole).includes(role))) {
            errors = addErrorDto('roles', 'one or more roles are not valid', errors);
        }

        if(Object.keys(errors).length > 0){
            return [errors, undefined];
        }
        
        return [undefined, new UpdateUserDto(name, email, password, roles)];
    }
}
