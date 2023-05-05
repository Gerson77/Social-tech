import { PasswordBcrypt } from "../../../../shared/crypto/password.bcrypt";
import { JWTtoken } from "../../../../shared/token/jwt.token";
import { UserPrismaRepository } from "../../repositories/prisma/user.prisma.repository";
import { AuthenticateUserController } from "./authenticate.controller";

const userPrismaRepository = new UserPrismaRepository()
const passwordBrypt = new PasswordBcrypt()
const token = new JWTtoken()
const authenticateUserController = new AuthenticateUserController(userPrismaRepository, passwordBrypt, token)

export { authenticateUserController }