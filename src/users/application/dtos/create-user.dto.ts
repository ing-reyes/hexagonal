import { addErrorDto } from "../../../common/errors/add.error"

export class CreateUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static create( object: {[key:string]:any} ): [Record<string, string[]>?, CreateUserDto?]{
        const { name, email, password } = object

        let errors: Record<string, string[]> = {}

        if( !name ) {
            errors = addErrorDto('name', 'name is required', errors);
        } 
        if( !email ) {
            errors = addErrorDto('email', 'email is required', errors);
        }
        if( !password ) {
            errors = addErrorDto('password', 'password is required', errors);
        }

        if(Object.keys(errors).length > 0){
            return [errors, undefined];
        }
        

        return [undefined, new CreateUserDto(name, email, password)]
    }
}
