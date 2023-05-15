import { prismaClient } from "../../../../database/prisma.config";
import { Conversation } from "../../entity/conversation-entity";
import { IConversationRepository } from "../conversation.repository";

export class ConversationPrismaRepository implements IConversationRepository {
  async updateLatestMessage(id: string, latestMessage: string): Promise<Conversation> {
    const updateMessage = await prismaClient.conversation.update({
      where: {
        id: id
      },
      data: {
        latestMessage: latestMessage,
        updatedAt: new Date()
      }
    })

    return updateMessage
  }

  async findOneConversation(id: string): Promise<Conversation | null> {
    const conversationsUser = await prismaClient.conversation.findFirst({
      where: {
        members: { 
          hasEvery: id
         }
      }
    });

    return conversationsUser
  }

  async findByConversation(id: string): Promise<Conversation[] | null> {
    const conversationsUser = await prismaClient.conversation.findMany({
      where: {
        members: { 
          hasEvery: [id]
         },
      }
    });

    return conversationsUser;
  }
  async createConversation(data: Conversation): Promise<Conversation> {
    const newConversation = await prismaClient.conversation.create({
      data: {
        members: data.members,
        latestMessage: data.latestMessage
      },
    });

    return newConversation;
  }
}
