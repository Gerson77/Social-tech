import { PasswordBcrypt } from "../../../../shared/crypto/password.bcrypt";
import { UserPrismaRepository } from "../../repositories/prisma/user.prisma.repository";
import { CreateUserController } from "./create-user.controller";

const userPrismaRepository = new UserPrismaRepository()
const passwordBcrypt = new PasswordBcrypt()
const createUserController = new CreateUserController(userPrismaRepository, passwordBcrypt)

export { createUserController }