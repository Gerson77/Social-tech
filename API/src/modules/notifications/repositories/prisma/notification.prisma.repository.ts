import { prismaClient } from "../../../../database/prisma.config";
import { Notification } from "../../entities/notification.entity";
import { INotificationRepository } from "../notification.repository";

export class NotificationPrismaRepository implements INotificationRepository {
  async findByNotificationId(id: string): Promise<Notification | null> {
    return prismaClient.notification.findUnique({
      where: {
        id: id,
      },
    });
  }

  async updateStatusNotification(id: string): Promise<Notification> {
    const updateStatusNotification = await prismaClient.notification.update({
      where: {
        id: id,
      },
      data: {
        status: true,
      },
    });

    return updateStatusNotification;
  }

  async findByAllNotificationUser(
    userId: string
  ): Promise<Notification[] | null> {
    const notifications = await prismaClient.notification.findMany({
      where: {
        userId: userId,
      }
    });
    return notifications;
  }

  async saveNotification(data: Notification): Promise<Notification> {
    const notification = await prismaClient.notification.create({
      data: {
        ...data,
      },
    });
    return notification;
  }
}
