import { CommentPrismaRepository } from "../../../comments/repositories/prisma/commet-prima.repository";
import { PostPrismaRepository } from "../../repositories/prisma/post.prisma.repository";
import { GetPostController } from "./get-post.controller";

const postPrismaRepository = new PostPrismaRepository()
const commentPrismaRepository = new CommentPrismaRepository();
const getPostController = new GetPostController(
    postPrismaRepository,
    commentPrismaRepository
);

export { getPostController };
