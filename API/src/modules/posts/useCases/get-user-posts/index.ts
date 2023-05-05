import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { GetUserPostsController } from "./get-userposts.controller";

const postPrismaRepository = new PostPrismaRepository
const getUserPostsController = new GetUserPostsController(postPrismaRepository)

export { getUserPostsController }