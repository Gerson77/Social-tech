import { prismaClient } from "../../../../database/prisma.config";
import { User } from "../../entities/user.entity";
import { IUserRepository } from "../user.repository";

export class UserPrismaRepository implements IUserRepository {
    async removeFriend(id: string, idFriend: string, listFriends: string[]): Promise<User | null> {
        const user = await  prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                friends: {
                    set: listFriends.filter((id: string) => id !== idFriend),
                }
            }
        })
        return user
    }

    async updateListFriend(id: string, friend: string): Promise<User> {
        const friends = await prismaClient.user.update({
            where: {
                id: id
            },
            data: {
                friends: {
                    push: friend
                }
            }
        })
        return friends
    }


    async findById(id: string): Promise<User | null> {
        return prismaClient.user.findUnique({
            where: {
                id: id
            }
        })
    }
    async findByEmail(email: string): Promise<User | null> {
        return prismaClient.user.findUnique({
            where: {
                email: email
            }
        })
    }
    async save(data: User): Promise<User> {
        const user = await prismaClient.user.create({
            data: {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                password: data.password,
                friends: data.friends,
                picturePath: data.picturePath,
                location: data.location,
                occupation: data.occupation,
                viewedProfile: data.viewedProfile,
                impressions: data.impressions,
            }
        })
        return user
    }
}