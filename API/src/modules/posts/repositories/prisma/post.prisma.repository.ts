import { prismaClient } from "../../../../database/prisma.config";
import { Post } from "../../entities/post.entity";
import { IPostRepository } from "../post.repository";

export class PostPrismaRepository implements IPostRepository {
  async deleteCommentPost(id: string, idComment: string,listCommnets: string[]): Promise<Post | null> {
    const post = await prismaClient.post.update({
      where: {
        id: id,
      },
      data: {
        comments: {
          set: listCommnets.filter((id: string) => id !== idComment),
        },
      },
    });
    return post;
  }

  async addComments(id: string, idComment: string): Promise<Post> {
    const post = await prismaClient.post.update({
      where: {
        id: id,
      },
      data: {
        comments: {
          push: idComment,
        },
      },
    });
    return post;
  }

  async removeLikeList(
    id: string,
    idFriend: string,
    listFriends: string[]
  ): Promise<Post | null> {
    const post = await prismaClient.post.update({
      where: {
        id: id,
      },
      data: {
        likes: {
          set: listFriends.filter((id: string) => id !== idFriend),
        },
      },
    });
    return post;
  }

  async updateLikeList(id: string, friend: string): Promise<Post> {
    const friends = await prismaClient.post.update({
      where: {
        id: id,
      },
      data: {
        likes: {
          push: friend,
        },
      },
    });
    return friends;
  }

  async findById(id: string): Promise<Post | null> {
    return prismaClient.post.findUnique({
      where: {
        id: id,
      },
    });
  }

  async getUserPosts(userId: string): Promise<Post[] | null> {
    return prismaClient.post.findMany({
      where: {
        userId: userId,
      },
    });
  }

  async getAllPosts(): Promise<Post[]> {
    return prismaClient.post.findMany();
  }

  async savePost(data: Post): Promise<Post> {
    const post = await prismaClient.post.create({
      data: {
        userId: data.userId,
        firstName: data.firstName,
        lastName: data.lastName,
        location: data.location,
        description: data.description,
        picturePath: data.picturePath,
        userPicturePath: data.userPicturePath,
        likes: data.likes,
        comments: data.comments,
      },
    });

    return post;
  }
}
