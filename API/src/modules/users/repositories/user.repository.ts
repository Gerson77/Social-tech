import { User } from "../entities/user.entity";

export interface IUserRepository {
  save(data: User): Promise<User>;
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  updateListFriend(id: string, friend: string): Promise<User>;

  removeFriend(
    id: string,
    idFriend: string,
    listFriends: string[]
  ): Promise<User | null>;

}
