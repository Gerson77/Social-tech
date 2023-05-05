import { PostPrismaRepository } from "../../../posts/repositories/prisma/post.prisma.repository";
import { CommentPrismaRepository } from "../../repositories/prisma/commet-prima.repository";
import { DeleteCommentController } from "./delete-comment.controller";


const postPrismaRepository = new PostPrismaRepository()
const commentPrismaRepository = new CommentPrismaRepository()
const deleteCommentController = new DeleteCommentController(postPrismaRepository, commentPrismaRepository)

export { deleteCommentController }