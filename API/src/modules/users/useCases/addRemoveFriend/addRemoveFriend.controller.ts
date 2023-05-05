import { Request, Response } from "express";
import { IUserRepository } from "../../repositories/user.repository";
import { AddRemoveFriendUseCase } from "./addRemoveFriend.useCase";

export class AddRemoveFriendController {
    constructor(private userRepository: IUserRepository){}

    async handle(request: Request, response: Response){
        try {
            const { id, friendId } = request.params
            const addRemoveFriendController = new AddRemoveFriendUseCase(this.userRepository)
            const result = await addRemoveFriendController.execute(id, friendId)
            return response.json(result)
        } catch (err: any) {
            return response.status(404).json(err.message)
        }
    }
}