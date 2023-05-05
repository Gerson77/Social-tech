import { ConversationPrismaRepository } from "../../../conversation/repository/prisma/conversation.prisma";
import { MessagePrismaRepository } from "../../repository/prisma/message.prisma.reporitory";
import { FindAllMessagesController } from "./find-all-messages.controller";

const messagePrismaRepository = new MessagePrismaRepository()
const conversationPrismaRepository = new ConversationPrismaRepository()
const findAllMessagesController = new FindAllMessagesController(messagePrismaRepository, conversationPrismaRepository)

export { findAllMessagesController }