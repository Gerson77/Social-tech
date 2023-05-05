import { UserPrismaRepository } from "../../../users/repositories/prisma/user.prisma.repository";
import { NotificationPrismaRepository } from "../../repositories/prisma/notification.prisma.repository";
import { NotificationController } from "./notification.controller";

const notificationPrismaRepository = new NotificationPrismaRepository()
const userPrismaRepository = new UserPrismaRepository()
const notificationController = new NotificationController(notificationPrismaRepository, userPrismaRepository)

export { notificationController }