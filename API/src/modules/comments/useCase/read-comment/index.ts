import { CommentPrismaRepository } from "../../repositories/prisma/commet-prima.repository";
import { ReadCommentController } from "./read-comment.controller";

const commentPrimaRepository = new CommentPrismaRepository()
const readCommentController = new ReadCommentController(commentPrimaRepository)

export { readCommentController }