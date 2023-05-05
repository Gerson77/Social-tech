import { Request, Response } from "express";
import { ReadCommentUseCase } from "./read-comment.usecase";
import { ICommentRepository } from "../../repositories/comment.repository";

export class ReadCommentController {
    constructor(private commentRepository: ICommentRepository){}
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const useCase = new ReadCommentUseCase(this.commentRepository)
            const result = await useCase.execute(id)
            return response.json(result)
        } catch (err: any) {
            return response.status(404).json(err.message)
        }
    }
}