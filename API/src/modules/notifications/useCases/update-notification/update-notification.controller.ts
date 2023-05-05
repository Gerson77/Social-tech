import { Request, Response } from "express";
import { UpdateNotificationUseCase } from "./update-notification.usecase";
import { INotificationRepository } from "../../repositories/notification.repository";

export class UpdateNotificationController {
    constructor(private notificationRepository: INotificationRepository){}
    async handle(request: Request, response: Response) {
        try {
            const { id } = request.params
            const status = request.body

            const updateNotificationUseCase = new UpdateNotificationUseCase(this.notificationRepository)
            const result = await updateNotificationUseCase.execute(id, status)
            return response.json(result)
        } catch (err: any) {
            return response.status(404).json(err.message)
        }
    }
}