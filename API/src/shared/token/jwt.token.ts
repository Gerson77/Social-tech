import { IToken } from "./token";
import { createHmac } from 'crypto'
import { User } from "../../modules/users/entities/user.entity";
import { sign, verify } from "jsonwebtoken";

export class JWTtoken implements IToken {
    private SECRET_TOKEN = process.env.SECRET_KEY || ''
    private SECRET_TOKEN_CRYPTO = createHmac('sha512', this.SECRET_TOKEN).digest('base64')

    /*
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0MDE4OTZlZTFhMWEzNWY3MGQ3Y2NhNSIsImlhdCI6MTY3NzgyMjUzMX0.Woo0Robi73b3UU6wE298VTbUSYNV8loA8Etk0yYrG3Y",
    "user": {
        "_id": "6401896ee1a1a35f70d7cca5",
        "firstName": "Gerson",
        "lastName": "Santos",
        "email": "gerson@gmail.com",
        "password": "$2b$10$7dKZTyO3cbRfRXCIN1BTIe2VBwa8BDXGncQKJW5PVAJOi9bF0IMHi",
        "picturePath": "p11.jpeg",
        "friends": [],
        "location": "San Fran, CA",
        "occupation": "Software Engineer",
        "viewedProfile": 7856,
        "impressions": 6615,
        "createdAt": "2023-03-03T05:45:18.242Z",
        "updatedAt": "2023-03-03T05:45:18.242Z",
        "__v": 0
    }
}
*/
    create(data: User): string {
        const token = sign({
            user: {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                picturePath: data.picturePath,
                friends: [],
                location: data.location,
                occupation: data.occupation,
                viewedProfile: data.viewedProfile,
                impressions: data.impressions,
            }
        }, this.SECRET_TOKEN_CRYPTO, {
            subject: data.id,
            expiresIn: '30m'
        })
        return token
    }

    valite(token: string): boolean {
        try {
            verify(token, this.SECRET_TOKEN_CRYPTO)
            return true 
        }catch(err: any) {
            return false
        }
    }
}