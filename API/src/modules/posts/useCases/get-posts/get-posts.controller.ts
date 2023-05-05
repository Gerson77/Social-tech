import { Request, Response } from "express";
import { IPostRepository } from "../../repositories/post.repository";
import { GetPostsUseCase } from "./get-posts.useCase";

export class GetPostsController {
  constructor(private postsRepository: IPostRepository) {}

  async handle(request: Request, response: Response) {
    const posts = new GetPostsUseCase(this.postsRepository);
    try {
      const result = await posts.execute();
      return response.json(result);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }
}
