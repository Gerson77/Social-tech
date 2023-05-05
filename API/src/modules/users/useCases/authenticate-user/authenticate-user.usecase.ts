import { IPassword } from "../../../../shared/crypto/password.crypto";
import { IToken } from "../../../../shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";

type UserRequest = {
    email: string
    password: string
}

export class AuthenticateUserUseCase {
    constructor(private userRepository: IUserRepository, private passwordCrypto: IPassword, private token: IToken) { }

    async execute({ email, password }: UserRequest) {
        if (!email || !password) {
            throw new Error('Email/password is required')
        }

        const user = await this.userRepository.findByEmail(email)

        if (!user) {
            throw new Error('Email/password is required')
        }

        const passwordCompareHash = await this.passwordCrypto.compare(password, user.password)

        if (!passwordCompareHash) {
            throw new Error('Email/password is required')
        }

        const tokenGenerated = await this.token.create(user)

        return {
            token: tokenGenerated,
            user: user
        }
    }
}