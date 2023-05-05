import { IPostRepository } from "../../../posts/repositories/post.repository";
import { ICommentRepository } from "../../repositories/comment.repository";

export class DeleteCommentUseCase {
    constructor(private postRepository: IPostRepository,private commentRepository: ICommentRepository){}

    async execute(id: string, idComment: string){
        const post = await this.postRepository.findById(id)

        if(!post){
            throw new Error('Post does not exists')
        }

        const comment = await this.commentRepository.findById(idComment)
    
        if(!comment) {
            throw new Error('Comment does not exists!')
        }

        await this.commentRepository.deleteComment(idComment)
        
        
        const list = await this.postRepository.deleteCommentPost(id, idComment, post.comments)

        return list
    }
}