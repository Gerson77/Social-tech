import { Router } from "express";
import { notificationController } from "../modules/notifications/useCases/create-notification";
import { readAllNotificationController } from "../modules/notifications/useCases/read-all-notication";
import { updateNotificationController } from "../modules/notifications/useCases/update-notification";

const notificationRouter = Router()

notificationRouter.post('/notifications/:id', async (request, response) => {
    await notificationController.handle(request, response)
})

notificationRouter.get('/notifications/:userId', async (request, response) => {
    await readAllNotificationController.handle(request, response)
})

notificationRouter.put('/notifications/:id', async (request, response) => {
    await updateNotificationController.handle(request, response)
})
export { notificationRouter }