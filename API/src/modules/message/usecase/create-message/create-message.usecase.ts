import { IConversationRepository } from "../../../conversation/repository/conversation.repository";
import { IMessageRepository } from "../../repository/message.reposytory";

type MessageRequest = {
  conversationId: string;
  senderId: string;
  messageContent: string;
  id: string;
};

export class CreateMessageUseCase {
  constructor(
    private messageRepository: IMessageRepository,
    private conversationRepository: IConversationRepository
  ) {}

  async execute(data: MessageRequest) {
    const conversationId = await this.conversationRepository.findByConversation(
      data.conversationId
    );

    if (!conversationId) throw new Error("Conversation does not exists");

    const newMessage = await this.messageRepository.createdMessage(data);

    await this.conversationRepository.updateLatestMessage(data.conversationId, newMessage.id)

    return newMessage;
  }
}
