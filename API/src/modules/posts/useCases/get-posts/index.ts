import { CommentPrismaRepository } from "../../../comments/repositories/prisma/commet-prima.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { GetPostsController } from "./get-posts.controller";

const postsPrismaRepository = new PostPrismaRepository()
const getPostsController = new GetPostsController(postsPrismaRepository)

export { getPostsController }