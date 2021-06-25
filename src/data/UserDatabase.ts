import { BaseDatabase } from "./BaseDatabase";
import { User } from "../model/User";

export interface IUserDatabase {
  createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void>;
  getUserByMail(email: string): Promise<User | undefined>;
}

export class UserDatabase extends BaseDatabase implements IUserDatabase {
  private static TABLE_NAME = "lama_users";

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      await this.getConnection()
        .insert({
          id,
          email,
          name,
          password,
          role,
        })
        .into(UserDatabase.TABLE_NAME);
    } catch (error) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  public async getUserByMail(email: string): Promise<User | undefined> {
    const result = await this.getConnection()
      .select("*")
      .from(UserDatabase.TABLE_NAME)
      .where({ email });

    if (!result[0]) {
      return undefined;
    }

    return User.toUserModel(result[0]);
  }
}

export default new UserDatabase();
