export class UpdateUserDto {
    private constructor(
        public name: string,
        public email: string,
        public password: string,
    ) {}

    static update( object: {[key:string]:any} ): [string?, UpdateUserDto?]{
        const { name, email, password } = object

        if( name ) {
            if( name.length == 0) return ['Name cannot be empty']
        }
        
        if( email ) {
            if( email.length == 0) return ['Email cannot be empty']
        }
        
        if( password ) {
            if( password.length == 0) return ['Password cannot be empty']
        }
        
        return [undefined, new UpdateUserDto(name, email, password)];
    }
}
