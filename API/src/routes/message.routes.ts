import { Router } from "express";
import { createMessageController } from "../modules/message/usecase/create-message";
import { findAllMessagesController } from "../modules/message/usecase/find-all-messages";

const messageRouter = Router()

messageRouter.post('/messages', async (request, response) => {
    await createMessageController.handle(request, response)
})

messageRouter.get('/messages/:conversationId', async (request, response) => {
    await findAllMessagesController.handle(request, response)
})

export { messageRouter }