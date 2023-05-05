import { Request, Response } from "express";
import { CreateMessageUseCase } from "./create-message.usecase";
import { IMessageRepository } from "../../repository/message.reposytory";
import { IConversationRepository } from "../../../conversation/repository/conversation.repository";

export class CreateMessageController {
    constructor(private messageRepository: IMessageRepository, private conversationRepository: IConversationRepository){}

    async handle(request: Request, response: Response) {
        try{
            const data = request.body
            const createMessageUseCase = new CreateMessageUseCase(this.messageRepository, this.conversationRepository)
            const result = await createMessageUseCase.execute(data)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ error: err.message })
        }
    }
}