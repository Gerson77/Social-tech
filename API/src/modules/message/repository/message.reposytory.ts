import { Message } from "../entity/message.entity";

export interface IMessageRepository {
    createdMessage(data: Message): Promise<Message>
    findAllMessages(id: string): Promise<Message[] | null>
}