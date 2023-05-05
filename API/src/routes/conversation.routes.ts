import { Router } from "express";
import { conversationController } from "../modules/conversation/usecase/create-conversation";
import { findConversationController } from "../modules/conversation/usecase/find-conversation";

const conversationRouter = Router();

conversationRouter.post("/conversation", async (request, response) => {
  await conversationController.handle(request, response);
});

conversationRouter.get('/conversation/:userId', async (request, response) => {
  await findConversationController.handle(request, response)
})

export { conversationRouter };
