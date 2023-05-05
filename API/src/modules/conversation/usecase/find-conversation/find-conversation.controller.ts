import { Request, Response } from "express";
import { IConversationRepository } from "../../repository/conversation.repository";
import { FindConversationUseCase } from "./find-conversation.usecase";

export class FindConversationController {
    constructor(private conversationRepository: IConversationRepository){}

    async handle(request: Request, response: Response){
        try{
            const { userId } = request.params
            const findConversationUseCase = new FindConversationUseCase(this.conversationRepository)
            const result = await findConversationUseCase.execute(userId)
            return response.json(result)
        }catch(err: any) {
            return response.status(404).json({ error: err.message })
        }
    }
}