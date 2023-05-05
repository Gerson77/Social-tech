import { IUserRepository } from "../../repositories/user.repository";

export class AddRemoveFriendUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string, friendId: string) {
    const user = await this.userRepository.findById(id);
    const friend = await this.userRepository.findById(friendId);

    if (!user) {
      throw new Error("User already exists");
    }

    if (!friend) {
      throw new Error("Friend id invalid");
    }

    const friendDuplicate = user.friends.includes(friendId);

    if (friendDuplicate) {
      throw new Error("Existing friend");
    }

    await this.userRepository.updateListFriend(id, friend.id);

    const listFriends = await Promise.all(
      user.friends.map((id) => this.userRepository.findById(id))
    );

    const formattedFriends = listFriends.map(
      ({
        id,
        firstName,
        lastName,
        occupation,
        location,
        picturePath,
      }: any) => {
        return { id, firstName, lastName, occupation, location, picturePath };
      }
    );

    return formattedFriends;
  }
}
