import { INotificationRepository } from "../../repositories/notification.repository";

export class ReadAllNotificationUseCase {
    constructor(private notificationRepository: INotificationRepository){}
    async execute(userId: string) {
        const notification = await this.notificationRepository.findByAllNotificationUser(userId)

        if(!notification) {
            throw new Error('ID User does not exists')
        }

        return notification
    }
}