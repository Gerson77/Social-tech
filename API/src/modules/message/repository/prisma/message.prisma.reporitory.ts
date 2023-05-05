import { prismaClient } from "../../../../database/prisma.config";
import { Message } from "../../entity/message.entity";
import { IMessageRepository } from "../message.reposytory";

export class MessagePrismaRepository implements IMessageRepository {
    async findAllMessages(id: string): Promise<Message[] | null> {
        return prismaClient.message.findMany({
            where: {
                conversationId: id
            }
        })
    }

    async createdMessage(data: Message): Promise<Message> {
        const message = await prismaClient.message.create({
            data: {
                conversationId: data.conversationId,
                senderId: data.senderId,
                messageContent: data.messageContent
            }
        })
        return message
    }

}