import { ICommentRepository } from "../../repositories/comment.repository";

export class ReadCommentUseCase {
    constructor(private commentRepository: ICommentRepository){}
    async execute(id: string){
        const comment = await this.commentRepository.findAllCommentsOnePost(id)

        if(!comment) {
            throw new Error('Comment does not exist')
        }

        return comment
    }
}