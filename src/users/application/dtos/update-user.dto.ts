import { addErrorDto } from "../../../common/errors/add.error"

export class UpdateUserDto {
    private constructor(
        public name?: string,
        public email?: string,
        public password?: string,
    ) {}

    static update( object: {[key:string]:any} ): [Record<string, string[]>?, UpdateUserDto?]{
        const { name, email, password } = object

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

        if(Object.keys(errors).length > 0){
            return [errors, undefined];
        }
        
        return [undefined, new UpdateUserDto(name, email, password)];
    }
}
