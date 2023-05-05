import { UserPrismaRepository } from "../../repositories/prisma/user.prisma.repository";
import { GetListFriendController } from "./getListFriend.controller";

const userPrismaRepository = new UserPrismaRepository()
const getListFriendController = new GetListFriendController(userPrismaRepository)


export { getListFriendController }