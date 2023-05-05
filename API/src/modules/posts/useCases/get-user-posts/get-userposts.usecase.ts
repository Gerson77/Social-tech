import { IPostRepository } from "../../repositories/post.repository";

export class GetUserPostsUseCase {
    constructor(private postsRepository: IPostRepository){}

    async execute(userId: string){
        const postsUser = await this.postsRepository.getUserPosts(userId)

        return postsUser
    }
}