import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { RemoveLikeController } from "./remove-like.controller";

const postRepository = new PostPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const removeLikeController = new RemoveLikeController(postRepository, userPrismaRepository)

export { removeLikeController }