import { ManagerError } from "../../../common/errors/manager.error";
import { User } from "../../domain/entities/user.entity";

export class UserMapper {

    static fromUserModelToEntity( object: {[key:string]: any} ): User{
        const { id, _id, name, email, password, roles } = object;
        
        if( !id && !_id ) throw ManagerError.badRequest('Missing id');
        if( !name ) throw ManagerError.badRequest('Missing name');
        if( !email ) throw ManagerError.badRequest('Missing email');
        if( !password ) throw ManagerError.badRequest('Missing password');
        if( !roles ) throw ManagerError.badRequest('Missing roles');

        return new User(id ?? _id, name, email, password, roles);
    }
}