import { IUserRepository } from "../../repositories/user.repository";

export class GetListFriendUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(id: string) {
    const user = await this.userRepository.findById(id);
    const friends = user?.friends;

    if(!user) {
        throw new Error('User is not found')
    }

    const listFriends = await Promise.all(
      user.friends.map((id) => this.userRepository.findById(id))
    );

    const formattedFriends = listFriends.map(
        ({ id, firstName, lastName, occupation, location, picturePath }: any) => {
          return { id, firstName, lastName, occupation, location, picturePath };
        }
      );

    return formattedFriends;
  }
}
