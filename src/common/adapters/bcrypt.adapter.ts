import { hashSync, compareSync } from 'bcryptjs'
import { injectable } from 'inversify'

@injectable()
export class BcryptAdapter {
    hash(password: string): string {
        return hashSync(password, 10)
    }
    
    compare(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword)
    }
}