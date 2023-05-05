import { IPostRepository } from "../../../posts/repositories/post.repository";
import { Comment } from "../../entity/comment.entity";
import { ICommentRepository } from "../../repositories/comment.repository";

type CommentRequest = {
  friendId: string;
  firstName: string;
  userPicturePath: string;
  comment: string;
};

export class CreateCommentUseCase {
  constructor(
    private postRepository: IPostRepository,
    private commentRepository: ICommentRepository
  ) {}

  async execute(idPost: string, data: CommentRequest) {
    const post = await this.postRepository.findById(idPost);

    if (!post) {
      throw new Error("Post does not exists");
    }

    const comment = await Comment.createComment({
      ...data,
      idPost: post.id,
    });

    const commentCreated = await this.commentRepository.saveComment(comment);

    const idCommentAdd = await this.postRepository.addComments(
      idPost,
      commentCreated.id
    );

    const comments = await Promise.all(
      idCommentAdd.comments.map((id) => this.commentRepository.findById(id))
    );

    return {
      ...post,
      comments: comments,
    };
  }
}
