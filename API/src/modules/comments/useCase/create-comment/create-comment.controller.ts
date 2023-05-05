import { Request, Response } from "express";
import { CreateCommentUseCase } from "./create-comment.usecase";
import { ICommentRepository } from "../../repositories/comment.repository";
import { IPostRepository } from "../../../posts/repositories/post.repository";

export class CreateCommentController {
    constructor(private postRepository: IPostRepository, private commentRepository: ICommentRepository){}

    async handle(request: Request, response: Response){
        try {
            const { id } = request.params
            const data = request.body
            const useCase = new CreateCommentUseCase(this.postRepository, this.commentRepository)
            const result = await useCase.execute(id, data)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json(err.message)
        }
    }
}