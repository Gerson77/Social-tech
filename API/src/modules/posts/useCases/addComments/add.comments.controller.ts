import { Request, Response } from "express";
import { IPostRepository } from "../../repositories/post.repository";
import { AddCommentsUseCase } from "./add-comments.usecase";

export class AddCommentsController {
    constructor(private postRepository: IPostRepository){}

    async handle(request: Request, response: Response){
        try {
            const { id } = request.params
            const data = request.body
            const addCommentsUseCase = new AddCommentsUseCase(this.postRepository)
            const result = await addCommentsUseCase.execute(id, data)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ message: err.message })
        }
    }
}