import { Request, Response } from "express";
import { IMessageRepository } from "../../repository/message.reposytory";
import { FindAllMessagesUseCase } from "./find-all-messages.usecase";
import { IConversationRepository } from "../../../conversation/repository/conversation.repository";

export class FindAllMessagesController {
    constructor(private messageRepository: IMessageRepository, private conversationRepository: IConversationRepository){}

    async handle(request: Request, response: Response) {
        try {
            const { conversationId } = request.params
            const findAllMessagesUseCase = new FindAllMessagesUseCase(this.messageRepository, this.conversationRepository)
            const result = await findAllMessagesUseCase.execute(conversationId)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ error: err.message })
        }
    }
}