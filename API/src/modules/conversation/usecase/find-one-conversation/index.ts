import { ConversationPrismaRepository } from "../../repository/prisma/conversation.prisma";
import { FindOneConversationController } from "./convertation-controller";

const conversationPrismaRepository = new ConversationPrismaRepository()
const findOneconversationController = new FindOneConversationController(conversationPrismaRepository)

export { findOneconversationController }