import { IUserRepository } from "../../../users/repositories/user.repository";
import { Post } from "../../entities/post.entity";
import { IPostRepository } from "../../repositories/post.repository";

type PostRequest = {
    userId: string
    firstName: string
    lastName: string
    location: string
    description: string
    picturePath: string
    userPicturePath: string
}

export class CreatePostUseCase {
    constructor(private postRepository: IPostRepository, private userRepository: IUserRepository){}

    async execute(data: PostRequest, picturePath?: string){
        const user = await this.userRepository.findById(data.userId)

        if(!user) {
            throw new Error('User does not exists')
        }

        const post = await Post.createPost({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description: data.description,
            picturePath: picturePath,
            userPicturePath: user.picturePath,
        })

        const createdPost = await this.postRepository.savePost(post)
        return createdPost
    }
}