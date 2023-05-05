import { UserPrismaRepository } from "../../repositories/prisma/user.prisma.repository";
import { GetDataUserController } from "./getDataUser.controller";

const userPrismaRepository = new UserPrismaRepository()
const getDataUserController = new GetDataUserController(userPrismaRepository)

export { getDataUserController }