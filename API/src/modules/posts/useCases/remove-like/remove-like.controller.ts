import { Request, Response } from "express";
import { RemoveLikeUseCase } from "./remove-like.usecase";
import { IPostRepository } from "../../repositories/post.repository";
import { IUserRepository } from "../../../users/repositories/user.repository";

export class RemoveLikeController {
    constructor(private postRepository: IPostRepository,  private userRepository: IUserRepository){}

    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const { friendId } = request.params
            const removeLikeUseCase = new RemoveLikeUseCase(this.postRepository, this.userRepository)
            const result = await removeLikeUseCase.execute(id, friendId)
            return response.json(result)
        } catch (err: any) {
            return response.status(404).json({ message: err.message })
        }
    }
}