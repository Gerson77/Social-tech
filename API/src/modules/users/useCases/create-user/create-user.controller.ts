import { Request, Response } from "express";
import { IPassword } from "../../../../shared/crypto/password.crypto";
import { IUserRepository } from "../../repositories/user.repository";
import { CreateUserUseCase } from "./create-user.usecase";

export class CreateUserController {
    constructor(private userRepository: IUserRepository, private passwordCrypto: IPassword) { }

    async handle(request: Request, response: Response) {
        try {
            const data = request.body
            const picturePath = request.file?.filename
            const createUseruseCase = new CreateUserUseCase(this.userRepository, this.passwordCrypto)
            const result = await createUseruseCase.execute(data, picturePath)
            return response.json(result)
        } catch (err: any) {
            return response.status(400).json(err.message)
        }
    }
}