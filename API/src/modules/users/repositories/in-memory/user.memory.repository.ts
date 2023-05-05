import { User } from "../../entities/user.entity";
import { IUserRepository } from "../user.repository";

export class UserMemoryRepository implements IUserRepository {
    users: []
    constructor(){
        this.users = []
    }
    updateListFriend(data: string, friend: string): Promise<User> {
        throw new Error("Method not implemented.");
    }

    async findByEmail(email: string): Promise<User | null> {
        return this.users.find(user => user.email === email) || null
    }

    async findById(id: string): Promise<User | null> {
        return this.users.find(user => user.id === id) || null
    }
    
    async save(data: User): Promise<User> {
        if(!data.email || !data.password) {
            throw new Error('Email/password is invalid')
        }

        this.users.push()
        return data
    }
}