import { IConversationRepository } from "../../repository/conversation.repository";

type ConversationRequest = {
  members: string[];
};
/*
export class ConversationUseCase {
  constructor(private convertationRepository: IConversationRepository) {}

  async execute(data: ConversationRequest) {
    const sender = await this.convertationRepository.findByConversation(
      data.members[0]
    );
    const receiver = await this.convertationRepository.findByConversation(
      data.members[1]
    );

    if (sender?.length !== 0 && receiver?.length !== 0) {
      
      // retornar a conversa
      if (sender?.length === 1) return sender;
      if (receiver?.length === 1) return receiver;

    } else {
      // cria a nova conversa
      const convertation = await this.convertationRepository.createConversation(
        {
          members: data.members,
        }
      );
      return convertation;
    }
  }
}


*/


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
      });
      return convertation;
    }

    return conversationMembers
  }
}
