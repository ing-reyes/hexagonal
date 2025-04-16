import { ValidatorsAdapter } from "../../../common/adapters/validators.adapter";
import { addErrorDto } from "../../../common/errors/add.error";
export class SignUpDto{

    constructor(
        public name: string,
        public email: string,
        public password: string,
    ){}

    static signUp(object: {[key:string]:any}): [Record<string, string[]>?, SignUpDto?]{
        const { name, email, password } = object;

        let errors: Record<string, string[]> = {};

        if(!name) {
            errors = addErrorDto("name", "name is required", errors);
        }

        if(!email) {
            errors = addErrorDto("email", "email is required", errors);
        }

        if ( !ValidatorsAdapter.isEmail(email) ) {
            errors = addErrorDto("email", "email is invalid", errors);
        }

        if(!password) {
            errors = addErrorDto("password", "password is required", errors);
        }
        
        if (Object.keys(errors).length > 0) {
            return [ errors, undefined ];
        }
        
        return [ undefined, new SignUpDto(name, email, password) ];
    }
}