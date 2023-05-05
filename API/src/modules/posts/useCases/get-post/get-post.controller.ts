import { Request, Response } from "express";
import { GetPostUseCase } from "./get-post.usecase";
import { IPostRepository } from "../../repositories/post.repository";
import { ICommentRepository } from "../../../comments/repositories/comment.repository";

export class GetPostController {
    constructor(private postRepository: IPostRepository, private commentRepository: ICommentRepository){}

    async handle(request: Request, response: Response){
        try {
            const { id } = request.params
            const useCase = new GetPostUseCase(this.postRepository, this.commentRepository)
            const result = await useCase.execute(id)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json(err.message)
        }
    }
}