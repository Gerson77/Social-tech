import { IPassword } from "../../../../shared/crypto/password.crypto";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../../repositories/user.repository";

type IUserRequest = {
    firstName: string
    lastName: string
    email: string
    password: string
    picturePath: string
    location: string
    occupation: string
    viewedProfile: number
    impressions: number
}

export class CreateUserUseCase {
    constructor(private userRepository: IUserRepository, private passwordCrypto: IPassword){}

    async execute(data: IUserRequest, picturePath?: string){
        const user = await User.create({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            picturePath: picturePath,
            location: data.location,
            occupation: data.occupation,
        })

        if(!user) {
            throw new Error('Email/password is required')
        }

        const emailExits = await this.userRepository.findByEmail(data.email)

        if(emailExits) {
            throw new Error('Email already exists')
        }

        const passwordHashed = await this.passwordCrypto.hash(data.password)
        user.password = passwordHashed

        const userCreated = await this.userRepository.save(user)
        return userCreated
    }

}