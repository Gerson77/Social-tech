import { Request, Response } from "express";
import { RemoveFriendsUseCase } from "./remove-friends.usecase";
import { IUserRepository } from "../../repositories/user.repository";

export class RemoveFriendsController {
  constructor(private userRepository: IUserRepository) {}
  async handle(request: Request, response: Response) {
    try {
      const { id, friendId } = request.params;
      const useCase = new RemoveFriendsUseCase(this.userRepository);
      const result = await useCase.execute(id, friendId);
      return response.json(result);
    } catch (err: any) {
      return response.status(404).json(err.message);
    }
  }
}
