import { prismaClient } from "../../../../database/prisma.config";
import { Comment } from "../../entity/comment.entity";
import { ICommentRepository } from "../comment.repository";

export class CommentPrismaRepository implements ICommentRepository {
    
    async findAllCommentsOnePost(id: string): Promise<Comment[]> {
        const commentsAllPost = await prismaClient.comment.findMany({
            where: {
                idPost: {
                    equals: id
                }
            }
        })
        return commentsAllPost
    }

    async deleteComment(id: string): Promise<Comment | null> {
        return prismaClient.comment.delete({
            where: {
                id: id
            }
        })
    }
    
    async findById(id: string): Promise<Comment | null> {
        return prismaClient.comment.findUnique({
            where: {
                id: id
            }
        })
    }
    
    async saveComment(data: Comment): Promise<Comment> {
        const comment = await prismaClient.comment.create({
            data: {
                idPost: data.idPost,
                friendId: data.friendId,
                firstName: data.firstName,
                userPicturePath: data.userPicturePath,
                comment: data.comment
            }
        })

        return comment
    }
}