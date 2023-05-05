import { Conversation } from "../entity/conversation-entity";

export interface IConversationRepository {
    createConversation(data: Conversation): Promise<Conversation>
    findByConversation(id: string): Promise<Conversation[] | null>

    findByConversationReceiver(receiverId: string): Promise<Conversation[] | null>
}