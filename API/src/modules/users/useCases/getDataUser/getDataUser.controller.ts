import { Request, Response, json } from "express";
import { GetDataUserUseCase } from "./getDataUser.useCase";
import { IUserRepository } from "../../repositories/user.repository";

export class GetDataUserController {
    constructor(private userRespository: IUserRepository){}
    async handle(request: Request, response: Response){
        try {
            const { id } = request.params
            const useCase = new GetDataUserUseCase(this.userRespository)
            const result = await useCase.execute(id)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json(err.message)
        }
    }
}