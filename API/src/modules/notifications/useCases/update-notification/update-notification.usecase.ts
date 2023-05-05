import { INotificationRepository } from "../../repositories/notification.repository";

export class UpdateNotificationUseCase {
  constructor(private notificationRepository: INotificationRepository) {}

  async execute(id: string, data: boolean) {
    const notification = await this.notificationRepository.findByNotificationId(
      id
    );

    if (!notification) {
      throw new Error("Notification does not exists");
    }

    if (data) {
      const updateStatusNotification =
        await this.notificationRepository.updateStatusNotification(id);
      return updateStatusNotification;
    }
  }
}
