import { ICommentRepository } from "../../../comments/repositories/comment.repository";
import { IPostRepository } from "../../repositories/post.repository";

export class GetPostUseCase {
  constructor(
    private postRepository: IPostRepository,
    private commentRepository: ICommentRepository
  ) {}

  async execute(idPost: string) {
    const post = await this.postRepository.findById(idPost);

    if (!post) {
      throw new Error("Post does not exists");
    }

    const comments = await Promise.all(
      post.comments.map((id) => this.commentRepository.findById(id))
    );

    return {
      ...post,
      comments: comments,
    };

    // return post
  }
}
