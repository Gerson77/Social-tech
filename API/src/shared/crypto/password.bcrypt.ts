import { IPassword } from "./password.crypto";
import bcrypt from 'bcryptjs'

export class PasswordBcrypt implements IPassword {
    async hash(password: string): Promise<string> {
        return bcrypt.hash(password, 10)
    }

    compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash)
    }
}