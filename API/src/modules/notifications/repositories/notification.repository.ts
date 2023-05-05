import { Notification } from "../entities/notification.entity";

export interface INotificationRepository {

    saveNotification(data: Notification): Promise<Notification>
    findByAllNotificationUser(userId: string): Promise<Notification[] | null>
    updateStatusNotification(id: string): Promise<Notification>
    findByNotificationId(id: string): Promise<Notification | null>
}