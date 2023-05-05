import { Request, Response } from "express";
import { GetListFriendUseCase } from "./getListFriend.useCase";
import { IUserRepository } from "../../repositories/user.repository";

export class GetListFriendController {
  constructor(private userRepository: IUserRepository) {}

  async handle(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const getListFriendUseCase = new GetListFriendUseCase(
        this.userRepository
      );
      const result = await getListFriendUseCase.execute(id);
      return response.json(result);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }
}
