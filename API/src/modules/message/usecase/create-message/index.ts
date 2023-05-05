import { ConversationPrismaRepository } from "../../../conversation/repository/prisma/conversation.prisma";
import { MessagePrismaRepository } from "../../repository/prisma/message.prisma.reporitory";
import { CreateMessageController } from "./create-message.controller";

const messagePrismaRepository = new MessagePrismaRepository()
const conversationPrismaRepository = new ConversationPrismaRepository()
const createMessageController = new CreateMessageController(messagePrismaRepository, conversationPrismaRepository)

export { createMessageController }