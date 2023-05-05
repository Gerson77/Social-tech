import { IUserRepository } from "../../../users/repositories/user.repository";
import { INotificationRepository } from "../../repositories/notification.repository";

type NotificationRequest = {
    action: string;
    status: boolean
    userId: string
  
    idFriend: string;
    firstName: string;
    userPicturePath: string;
    idPost: string
    postPicturePath: string
    contentComment: string
}

export class NotificationUseCase {
    constructor(private notificationRepository: INotificationRepository, private userRepository: IUserRepository){}

    async execute(id: string,data: NotificationRequest) {
        const idFriend = await this.userRepository.findById(id)

        if(!idFriend) {
            throw new Error('Friend does not exists')
        }

        const notificationCreated = await this.notificationRepository.saveNotification({
            action: data.action,
            userId: data.userId,
            id: data.idFriend,
            status: data.status,
            idFriend: id,
            firstName: data.firstName,
            userPicturePath: data.userPicturePath,
            idPost: data.idPost,
            postPicturePath: data.postPicturePath,
            contentComment: data.contentComment
        })
        
        return notificationCreated
    }
}