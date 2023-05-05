import { Request, Response } from "express";
import { GetUserPostsUseCase } from "./get-userposts.usecase";
import { IPostRepository } from "../../repositories/post.repository";

export class GetUserPostsController {
    constructor(private postsRepository: IPostRepository){}
    async handle(request: Request, response: Response){
        try {
            const { userId } = request.params
            const postUseCase = new GetUserPostsUseCase(this.postsRepository)
            const result = await postUseCase.execute(userId)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json(err.message)
        }
    }
}