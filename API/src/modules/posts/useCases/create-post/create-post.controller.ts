import { Request, Response } from "express";
import { IPostRepository } from "../../repositories/post.repository";
import { CreatePostUseCase } from "./create-posts.usecases";
import { IUserRepository } from "../../../users/repositories/user.repository";

export class CreatePostController {
    constructor(private postRepository: IPostRepository, private userRepository: IUserRepository){}

    async handle(request: Request, response: Response) {
        try{
            const data = request.body
            const picturePath = request.file?.filename
            const createPostUseCase = new CreatePostUseCase(this.postRepository, this.userRepository)
            const result = await createPostUseCase.execute(data, picturePath)
            return response.json(result)
        }catch(err: any) {
            return response.status(400).json(err.message)
        }
    }
}