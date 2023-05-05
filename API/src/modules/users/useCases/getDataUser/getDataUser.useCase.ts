import { IUserRepository } from "../../repositories/user.repository";

export class GetDataUserUseCase {
    constructor(private userRepository: IUserRepository){}
    async execute(id: string){
        const user = await this.userRepository.findById(id)

        if(!user) {
            throw new Error('User does not exists!')
        }

        return user
    }
}