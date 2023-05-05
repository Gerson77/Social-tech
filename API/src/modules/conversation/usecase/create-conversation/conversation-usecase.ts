import { IConversationRepository } from "../../repository/conversation.repository";

type ConversationRequest = {
    members: string[]
    senderId: string
    receiverId: string
}

export class ConversationUseCase {
    constructor(private convertationRepository: IConversationRepository){}

    async execute(data: ConversationRequest){

        const receiverIdExist = await this.convertationRepository.findByConversationReceiver(data.receiverId)

        if(receiverIdExist?.length !== 0) {
            throw new Error('Conversation this with user already exists')
        }
        
        const convertation = await this.convertationRepository.createConversation({
            senderId: data.senderId,
            receiverId: data.receiverId,
            members: data.members
        })
        return convertation
    }
}