import { Request, Response } from "express";
import { IPassword } from "../../../../shared/crypto/password.crypto";
import { IToken } from "../../../../shared/token/token";
import { IUserRepository } from "../../repositories/user.repository";
import { AuthenticateUserUseCase } from "./authenticate-user.usecase";

export class AuthenticateUserController {
    constructor(private userRepository: IUserRepository, private passwordCrypto: IPassword, private token: IToken){}
    
    async handle(request: Request, response: Response) {
        try {
            const data = request.body
            const authenticateUserUseCase = new AuthenticateUserUseCase(this.userRepository, this.passwordCrypto, this.token)
            const result = await authenticateUserUseCase.execute(data)
            return response.json(result)
        } catch (err: any) {
            return response.status(400).json(err.message)
        }
    }
}