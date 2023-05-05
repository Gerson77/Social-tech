import { Post } from "../../entities/post.entity";
import { IPostRepository } from "../post.repository";

export class PostMemoryRepository implements IPostRepository {
    posts: []

    constructor(){
        this.posts = []
    }
    async getAllPosts(): Promise<Post[]> {
        const posts = this.posts
        return posts
    }
    async savePost(data: Post): Promise<Post> {
        this.posts.push()
        return data
    }

}