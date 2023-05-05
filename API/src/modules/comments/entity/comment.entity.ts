import { randomUUID } from "crypto";

type IComment = {
  idPost: string;
  friendId: string;
  firstName: string;
  userPicturePath: string;
  comment: string;
};
export class Comment {
  idPost: string;
  friendId: string;
  firstName: string;
  userPicturePath: string;
  comment: string;
  id: string;

  private constructor(data: IComment) {
    this.idPost = data.idPost;
    this.friendId = data.friendId;
    this.firstName = data.firstName;
    this.userPicturePath = data.userPicturePath;
    this.comment = data.comment;
    this.id = randomUUID();
  }

  static async createComment(data: IComment) {
    const comment = new Comment(data);
    return comment;
  }
}
