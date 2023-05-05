import { IPostRepository } from "../../repositories/post.repository";

export class GetPostsUseCase {
  constructor(
    private postsRepository: IPostRepository
  ) {}
  async execute() {
    const posts = await this.postsRepository.getAllPosts();

    return posts;
  }
}
