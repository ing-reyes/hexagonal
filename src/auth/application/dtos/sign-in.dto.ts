export class SignInDto{

    constructor(
        public email: string,
        public password: string,
    ){}

    static signIn(object: {[key:string]:any}): [string?, SignInDto?]{
        const { email, password } = object;

        if(!email) return ["email is required"];
        if(!password) return ["password is required"];

        return [ undefined, new SignInDto(email, password) ]
    }
}