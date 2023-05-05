import { UserPrismaRepository } from "../../repositories/prisma/user.prisma.repository"
import { AddRemoveFriendController } from "./addRemoveFriend.controller"

const userPrismaRepository = new UserPrismaRepository()
const addRemoveFriendController = new AddRemoveFriendController(userPrismaRepository)

export { addRemoveFriendController }