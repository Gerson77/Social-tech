import { Router } from "express";
import { authenticateUserController } from "../modules/users/useCases/authenticate-user";
import { createUserController } from "../modules/users/useCases/create-user";
import { getListFriendController } from "../modules/users/useCases/getListFriends";
import { addRemoveFriendController } from "../modules/users/useCases/addRemoveFriend";
import { getDataUserController } from "../modules/users/useCases/getDataUser";
import uploadConfig from "../config/upload.config";
import multer from "multer";
import { removeFriendsController } from "../modules/users/useCases/removeFriends";

const upload = multer(uploadConfig);
const userRouter = Router();

userRouter.post(
  "/user",
  upload.single("picturePath"),
  async (request, response) => {
    await createUserController.handle(request, response);
  }
);

userRouter.post("/login", async (request, response) => {
  await authenticateUserController.handle(request, response);
});

userRouter.get("/users/:id/friends", async (request, response) => {
  await getListFriendController.handle(request, response);
});

userRouter.get("/users/:id", async (request, response) => {
  await getDataUserController.handle(request, response);
});

userRouter.patch("/users/:id/:friendId", async (request, response) => {
  await addRemoveFriendController.handle(request, response);
});

userRouter.put("/users/:id/:friendId", async (request, response) => {
  await removeFriendsController.handle(request, response);
});

export { userRouter };
