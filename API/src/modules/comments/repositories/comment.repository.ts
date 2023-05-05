import { Comment } from "../entity/comment.entity"

export type ICommentRepository = {
    saveComment(data: Comment): Promise<Comment>
    findById(id: string): Promise<Comment | null>
    deleteComment(id: string): Promise<Comment | null>
    findAllCommentsOnePost(id: string): Promise<Comment[]>
}