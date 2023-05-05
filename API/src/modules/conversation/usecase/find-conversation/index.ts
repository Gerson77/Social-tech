import { ConversationPrismaRepository } from "../../repository/prisma/conversation.prisma";
import { FindConversationController } from "./find-conversation.controller";

const conversationPrismaRepository = new ConversationPrismaRepository()
const findConversationController = new FindConversationController(conversationPrismaRepository)

export { findConversationController }