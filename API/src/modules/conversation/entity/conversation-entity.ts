type IConversation = {
  members: string[];
};
export class Conversation {
  members: string[];

  private constructor(data: IConversation) {
    this.members = data.members;
  }

  static async createConversation(data: IConversation) {
    const conversation = new Conversation(data);
    return conversation;
  }
}
