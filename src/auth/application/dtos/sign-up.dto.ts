export class SignUpDto{

    constructor(
        public name: string,
        public email: string,
        public password: string,
    ){}

    static signUp(object: {[key:string]:any}): [string?, SignUpDto?]{
        const { name, email, password } = object;

        if(!name) return ["name is required"];
        if(!email) return ["email is required"];
        if(!password) return ["password is required"];

        return [ undefined, new SignUpDto(name, email, password) ];
    }
}