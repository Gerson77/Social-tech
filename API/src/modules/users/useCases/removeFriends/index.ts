import { UserPrismaRepository } from "../../repositories/prisma/user.prisma.repository";
import { RemoveFriendsController } from "./remove-friends.controller";

const userPrismaRepository = new UserPrismaRepository()
const removeFriendsController = new RemoveFriendsController(userPrismaRepository)

export { removeFriendsController }