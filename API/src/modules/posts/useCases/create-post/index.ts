import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { CreatePostController } from "./create-post.controller";

const postPrismaRepository = new PostPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const createPostController = new CreatePostController(postPrismaRepository, userPrismaRepository)

export { createPostController }