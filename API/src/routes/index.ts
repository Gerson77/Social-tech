import { Router } from "express";
import { postRouter } from "./post.routes";
import { userRouter } from "./user.routes";
import { notificationRouter } from "./notification.routes";
import { conversationRouter } from "./conversation.routes";
import { messageRouter } from "./message.routes";

const router = Router()

router.use(userRouter)
router.use(postRouter)
router.use(notificationRouter)
router.use(conversationRouter)
router.use(messageRouter)

export { router }