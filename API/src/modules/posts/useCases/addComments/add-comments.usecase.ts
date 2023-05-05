import { IPostRepository } from "../../repositories/post.repository";

export class AddCommentsUseCase {
    constructor(private postRepository: IPostRepository){}

    async execute(id: string, idComment: string) {
        const post = await this.postRepository.findById(id)

        if(!post) {
            throw new Error('Post does not exists')
        }

        const commentCreated = await this.postRepository.addComments(id, idComment)

        return commentCreated
    }
}