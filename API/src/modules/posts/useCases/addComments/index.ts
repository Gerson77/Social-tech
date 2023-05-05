import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { AddCommentsController } from "./add.comments.controller";

const postPrismaRepository = new PostPrismaRepository()
const addCommentsController = new AddCommentsController(postPrismaRepository)

export { addCommentsController }