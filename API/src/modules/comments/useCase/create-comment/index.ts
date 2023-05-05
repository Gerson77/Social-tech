import { PostPrismaRepository } from "../../../posts/repositories/prisma/post.prisma.repository";
import { CommentPrismaRepository } from "../../repositories/prisma/commet-prima.repository";
import { CreateCommentController } from "./create-comment.controller";

const postPrismaRepository = new PostPrismaRepository()
const commentPrismaRepository = new CommentPrismaRepository();
const createCommentController = new CreateCommentController(
    postPrismaRepository,
    commentPrismaRepository
);

export { createCommentController };
