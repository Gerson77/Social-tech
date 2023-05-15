type IConversation = {
  members: string[];
  latestMessage: string
};
export class Conversation {
  members: string[];
  latestMessage: string

  private constructor(data: IConversation) {
    this.members = data.members;
    this.latestMessage = data.latestMessage
  }

  static async createConversation(data: IConversation) {
    const conversation = new Conversation(data);
    return conversation;
  }
}
