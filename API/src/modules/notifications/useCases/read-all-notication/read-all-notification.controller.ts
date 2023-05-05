import { Request, Response } from "express";
import { ReadAllNotificationUseCase } from "./read-all-notification.usecase";
import { INotificationRepository } from "../../repositories/notification.repository";

export class ReadAllNotificationController {
    constructor(private notificationRepository: INotificationRepository){}
    async handle(request: Request, response: Response){
        try {
            const { userId } = request.params
            const readAllNotificationUseCase = new ReadAllNotificationUseCase(this.notificationRepository)
            const result = await readAllNotificationUseCase.execute(userId)
            return response.json(result)
        } catch (err: any) {
            return response.status(404).json(err.message)
        }
    }
}