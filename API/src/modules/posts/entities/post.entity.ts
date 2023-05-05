import { randomUUID } from "crypto";

type IPost = {
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath?: string | null;
  userPicturePath?: string | null;
};

export class Post {
  userId: string;
  firstName: string;
  lastName: string;
  location: string;
  description: string;
  picturePath?: string | null;
  userPicturePath?: string | null;
  likes: string[];
  comments: string[];
  id: string;

  private constructor(data: IPost) {
    this.userId = data.userId;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.location = data.location;
    this.description = data.description;
    this.picturePath = data.picturePath;
    this.userPicturePath = data.userPicturePath;
    this.likes = [];
    this.comments = [];
    this.id = randomUUID();
  }

  static async createPost(data: IPost) {
    const post = new Post(data);
    return post;
  }
}
