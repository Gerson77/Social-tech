import { IConversationRepository } from "../../repository/conversation.repository";

export class FindConversationUseCase {
    constructor(private conversationRepository: IConversationRepository){}

    async execute(id: string){
        const conversation = await this.conversationRepository.findByConversation(id)

        if(!conversation) throw new Error('Conversation not started')


        return conversation
    }
}