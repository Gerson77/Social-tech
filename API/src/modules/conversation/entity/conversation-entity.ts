
type IConversation = {
    members: string[]
    senderId: string
    receiverId: string
}
export class Conversation {
    members: string[]
    senderId: string
    receiverId: string

    private constructor(data: IConversation){
        this.members = data.members
        this.senderId = data.senderId
        this.receiverId = data.receiverId
    }

    static async createConversation(data: IConversation) {
        const conversation = new Conversation(data)
        return conversation
    }
}