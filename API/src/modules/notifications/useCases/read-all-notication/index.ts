import { NotificationPrismaRepository } from "../../repositories/prisma/notification.prisma.repository";
import { ReadAllNotificationController } from "./read-all-notification.controller";

const notificationPrismaRepository = new NotificationPrismaRepository()
const readAllNotificationController = new ReadAllNotificationController(notificationPrismaRepository)

export { readAllNotificationController }