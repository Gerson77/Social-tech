import { Request, Response } from "express";
import { DeleteCommentUseCase } from "./delete-comment.usecase";
import { IPostRepository } from "../../../posts/repositories/post.repository";
import { ICommentRepository } from "../../repositories/comment.repository";

export class DeleteCommentController {
    constructor(private postRepository: IPostRepository, private commentRepository: ICommentRepository){}
    async handle(request: Request, response: Response) {
        try{
            const { id, idComment } = request.params
            const useCase = new DeleteCommentUseCase(this.postRepository, this.commentRepository)
            const result = await useCase.execute(id, idComment)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json(err.message)
        }
    }
}