import { Request, Response } from "express";
import { NotificationUseCase } from "./notification.usecase";
import { INotificationRepository } from "../../repositories/notification.repository";
import { IUserRepository } from "../../../users/repositories/user.repository";

export class NotificationController {
    constructor(private notficationRepository: INotificationRepository, private userRepository: IUserRepository){}
    async handle(request: Request, response: Response){
        try {
            const { id } = request.params
            const data = request.body
            const notificationUseCase = new NotificationUseCase(this.notficationRepository, this.userRepository)
            const result = await notificationUseCase.execute(id, data)
            return response.json(result)
        }catch(err: any){ 
            return response.status(404).json(err.message)
        }
    }
}