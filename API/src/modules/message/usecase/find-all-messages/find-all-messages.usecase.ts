import { IConversationRepository } from "../../../conversation/repository/conversation.repository";
import { IMessageRepository } from "../../repository/message.reposytory";

export class FindAllMessagesUseCase {
  constructor(
    private messageRepository: IMessageRepository,
    private conversationRepository: IConversationRepository
  ) {}

  async execute(id: string) {
    const conversationId = await this.conversationRepository.findByConversation(
      id
    );

    if (!conversationId) throw new Error("Conversation does not exists");

    const messagesConversations = await this.messageRepository.findAllMessages(
      id
    );

    if (!messagesConversations)
      throw new Error("No messages for this conversation");

    return messagesConversations;
  }
}
