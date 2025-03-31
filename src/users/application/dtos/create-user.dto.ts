export class CreateUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static create( object: {[key:string]:any} ): [string?, CreateUserDto?]{
        const { name, email, password } = object

        if( !name ) return ['Missing name'] 
        if( !email ) return ['Missing email'] 
        if( !password ) return ['Missing password'] 
        

        return [undefined, new CreateUserDto(name, email, password)]
    }
}
