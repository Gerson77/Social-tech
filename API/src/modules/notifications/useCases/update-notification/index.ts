import { NotificationPrismaRepository } from "../../repositories/prisma/notification.prisma.repository";
import { UpdateNotificationController } from "./update-notification.controller";

const notificationRepository = new NotificationPrismaRepository()
const updateNotificationController = new UpdateNotificationController(notificationRepository)

export { updateNotificationController }