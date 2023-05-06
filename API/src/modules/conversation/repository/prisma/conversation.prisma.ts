import { prismaClient } from "../../../../database/prisma.config";
import { Conversation } from "../../entity/conversation-entity";
import { IConversationRepository } from "../conversation.repository";

export class ConversationPrismaRepository implements IConversationRepository {
  async findByConversationReceiver(
    receiverId: string
  ): Promise<Conversation | null> {
    const receiverIdUser = await prismaClient.conversation.findFirst({
      where: {
        receiverId: receiverId,
      },
    });
    return receiverIdUser;
  }

  async findByConversation(id: string): Promise<Conversation[] | null> {
    const conversationsUser = await prismaClient.conversation.findMany({
      where: {
        OR: [
          {
            senderId: {
              contains: id,
            },
          },
          {
            receiverId: {
              contains: id,
            },
          },
        ],
      },
    });

    return conversationsUser;
  }
  async createConversation(data: Conversation): Promise<Conversation> {
    const newConversation = await prismaClient.conversation.create({
      data: {
        senderId: data.senderId,
        receiverId: data.receiverId,
        members: data.members,
      },
    });

    return newConversation;
  }
}
