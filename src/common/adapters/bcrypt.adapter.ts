import { hashSync, compareSync } from 'bcryptjs'

export class BcryptAdapter {
    hash(password: string): string {
        return hashSync(password, 10)
    }
    
    compare(password: string, hashedPassword: string): boolean {
        return compareSync(password, hashedPassword)
    }
}