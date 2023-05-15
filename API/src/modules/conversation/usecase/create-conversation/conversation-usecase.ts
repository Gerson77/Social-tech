import { IConversationRepository } from "../../repository/conversation.repository";

type ConversationRequest = {
  members: string[];
  latestMessage: string
};

export class ConversationUseCase {
  constructor(private convertationRepository: IConversationRepository) {}

  async execute(data: ConversationRequest) {
    const sender = await this.convertationRepository.findByConversation(
      data.members[0]
    );
    const receiver = await this.convertationRepository.findByConversation(
      data.members[1]
    );

    if (!sender || !receiver) throw new Error("Params error");

    let conversationMembers = {};
    const concatResult = sender.concat(receiver);

    concatResult.map((res) => {
      if (
        JSON.stringify(res.members).includes(data.members[0]) &&
        JSON.stringify(res.members.includes(data.members[1])) &&
        JSON.stringify(res.members).includes(data.members[1]) &&
        JSON.stringify(res.members.includes(data.members[0]))
      ) {
        if (res.members === res.members) {
          conversationMembers = res;
        }
      }
    });

    if(Object.values(conversationMembers).length === 0) {
      const convertation = await this.convertationRepository.createConversation({
        members: data.members,
        latestMessage: ''
      });
      return convertation;
    }

    return conversationMembers
  }
}
