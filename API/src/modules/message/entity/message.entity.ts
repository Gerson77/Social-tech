import { randomUUID } from 'crypto'

type IMessage = {
    conversationId: string
    senderId: string
    messageContent: string
}

export class Message {
    conversationId: string
    senderId: string
    messageContent: string
    id: string
    
    private constructor(data: IMessage){
        this.conversationId = data.conversationId
        this.senderId = data.senderId
        this.messageContent = data.messageContent
        this.id = randomUUID()
    }

    static async createMessage(data: IMessage) {
        const message = new Message(data)
        return message
    }
}