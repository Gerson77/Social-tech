import { IUserRepository } from "../../../users/repositories/user.repository";
import { IPostRepository } from "../../repositories/post.repository";

export class AddLikeUseCase {
  constructor(
    private postRepository: IPostRepository,
    private userRepository: IUserRepository
  ) {}

  async execute(id: string, friendId: string) {
    const post = await this.postRepository.findById(id);
    const friend = await this.userRepository.findById(friendId);

    if (!post) {
      throw new Error("Post does not exists");
    }

    if (!friend) {
      throw new Error("Friend does not exists");
    }

    const likeDuplicate = post.likes.includes(friendId);

    if (likeDuplicate) {
      throw new Error("Like add");
    }

    const listLikeUpdate = await this.postRepository.updateLikeList(
      id,
      friend.id
    );

    return listLikeUpdate;
  }
}
