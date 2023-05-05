import { randomUUID } from "crypto";

type IUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string | null;
  location: string;
  occupation: string;
  viewedProfile?: number | null;
  impressions?: number | null;
};

export class User {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  picturePath?: string | null;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile?: number | null;
  impressions?: number | null;
  id: string;

  private constructor(props: IUser) {
    if (!props.email || !props.password) {
      throw new Error("Email/password is required");
    }

    this.id = randomUUID();
    this.firstName = props.firstName;
    this.lastName = props.lastName;
    this.email = props.email;
    this.password = props.password;
    this.picturePath = props.picturePath;
    this.friends = [];
    this.location = props.location;
    this.occupation = props.occupation;
    this.viewedProfile = props.viewedProfile;
    this.impressions = props.impressions;
  }

  static async create(data: IUser) {
    if (!data.email || !data.password) {
      throw new Error("Email/password is required");
    }

    const user = new User(data);
    return user;
  }
}
