import { Router } from "express";
import { createPostController } from "../modules/posts/useCases/create-post";
import { getPostsController } from "../modules/posts/useCases/get-posts";
import { getUserPostsController } from "../modules/posts/useCases/get-user-posts";
import multer from "multer";
import uploadConfig from "../config/upload.config";
import { removeLikeController } from "../modules/posts/useCases/remove-like";
import { addLikeController } from "../modules/posts/useCases/add-like";
import { createCommentController } from "../modules/comments/useCase/create-comment";
import { deleteCommentController } from "../modules/comments/useCase/delete-comment";
import { readCommentController } from "../modules/comments/useCase/read-comment";
import { getPostController } from "../modules/posts/useCases/get-post";

const upload = multer(uploadConfig);
const postRouter = Router();

postRouter.post(
  "/post",
  upload.single("picturePath"),
  async (request, response) => {
    await createPostController.handle(request, response);
  }
);

postRouter.get("/posts", async (request, response) => {
  await getPostsController.handle(request, response);
});

postRouter.get("/posts/:userId/posts", async (request, response) => {
  await getUserPostsController.handle(request, response);
});

postRouter.get("/post/:id", async (request, response) => {
  await getPostController.handle(request, response);
});


// Like
postRouter.patch("/post/:id/:friendId/like", async (request, response) => {
  await addLikeController.handle(request, response);
});

postRouter.put("/post/:id/:friendId/like", async (request, response) => {
  await removeLikeController.handle(request, response);
});

// Comments
postRouter.post('/post/:id', async (request, response) => {
  await createCommentController.handle(request, response)
})

postRouter.delete('/post/:id/comments/:idComment', async (request, response) => {
  await deleteCommentController.handle(request, response)
})

postRouter.get('/posts/comments/:id', async (request, response) => {
  await readCommentController.handle(request, response)
})

export { postRouter };
