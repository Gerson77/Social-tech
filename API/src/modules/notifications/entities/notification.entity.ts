import { randomUUID } from "crypto";

type INotification = {
  action: string;
  status: boolean
  userId: string

  idFriend: string;
  firstName: string;
  userPicturePath: string;

  idPost: string | null;
  postPicturePath: string | null;

  contentComment: string | null;
};

export class Notification {
  id: string;
  action: string;
  status: boolean
  userId

  idFriend: string;
  firstName: string;
  userPicturePath: string;

  idPost: string | null;
  postPicturePath: string | null;

  contentComment: string | null;

  private constructor(data: INotification) {
    this.id = randomUUID();
    this.action = data.action;
    this.status = false
    this.userId = data.userId

    this.idFriend = data.idFriend;
    this.firstName = data.firstName;
    this.userPicturePath = data.userPicturePath;

    this.idPost = data.idPost;
    this.postPicturePath = data.postPicturePath;

    this.contentComment = data.contentComment;
  }

  static async createNotification(data: INotification) {
    const notification = new Notification(data);
    return notification;
  }
}
