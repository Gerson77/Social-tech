import { Request, Response } from "express";
import { IConversationRepository } from "../../repository/conversation.repository";
import { ConversationUseCase } from "./conversation-usecase";

export class ConversationController {
    constructor(private conversationRepository: IConversationRepository){
    }
    async handle(request: Request, response: Response) {
        try{
            const {senderId, receiverId } = request.body
            const conversationUseCase = new ConversationUseCase(this.conversationRepository)
            const result = await conversationUseCase.execute({ members: [ senderId, receiverId ], latestMessage: ''})
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ error: err.message })
        }
    }
}