import { IUserRepository } from "../../repositories/user.repository";

export class RemoveFriendsUseCase {
    constructor(private userRepository: IUserRepository){}

    async execute(id: string, idFriend: string){
        const user = await this.userRepository.findById(id)
        
        if(!user) {
            throw new Error('User does not exists')
        }
        
        const friend = await this.userRepository.findById(idFriend)

        if(!friend){
            throw new Error('Friend does not exists')
        }
        
        const listUpdate = await this.userRepository.removeFriend(id, idFriend, user.friends)
        return listUpdate
    }
}