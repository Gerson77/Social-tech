import { IUserRepository } from "../../../users/repositories/user.repository"
import { IPostRepository } from "../../repositories/post.repository"

export class RemoveLikeUseCase {
    constructor(private postRepository: IPostRepository, private userRepository: IUserRepository){}

    async execute(id: string, friendId: string){
        const post = await this.postRepository.findById(id)
        
        if(!post) {
            throw new Error('Post does not exists')
        }
        
        const friend = await this.userRepository.findById(friendId)

        if(!friend){
            throw new Error('Friend does not exists')
        }
        
        const listUpdate = await this.postRepository.removeLikeList(id, friendId, post.likes)
        return listUpdate
    }
}