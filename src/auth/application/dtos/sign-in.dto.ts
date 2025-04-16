import { addErrorDto } from "../../../common/errors/add.error";

export class SignInDto{

    constructor(
        public email: string,
        public password: string,
    ){}

    static signIn(object: {[key:string]:any}): [Record<string, string[]>?, SignInDto?]{
        const { email, password } = object;

        let errors: Record<string,string[]> = {};

        if (!email) {
            errors = addErrorDto('email', 'email is required', errors);
        }
        if (!password) {
            errors = addErrorDto('password', 'password is required', errors);
        }
        if (Object.keys(errors).length > 0) {
            return [ errors, undefined ]
        }

        return [ undefined, new SignInDto(email, password) ]
    }
}