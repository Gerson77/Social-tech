import { ConversationPrismaRepository } from "../../repository/prisma/conversation.prisma";
import { ConversationController } from "./convertation-controller";

const conversationPrismaRepository = new ConversationPrismaRepository()
const conversationController = new ConversationController(conversationPrismaRepository)

export { conversationController }