import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { AddLikeController } from "./add-like.controller";

const postPrismaRepository = new PostPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const addLikeController = new AddLikeController(postPrismaRepository, userPrismaRepository)

export { addLikeController }