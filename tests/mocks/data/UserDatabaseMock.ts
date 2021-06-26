import { User } from "../../../src/model/User";
import { userMockAdm, userMockNormal } from "../userMock";
import { IUserDatabase } from "../../../src/data/UserDatabase";

export class UserDatabaseMock implements IUserDatabase {
  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {}

  public async getUserByMail(email: string): Promise<User | undefined> {
    switch (email) {
      case "astrodev@mail.com":
        return userMockAdm;
      case "ale@mail.com":
        return userMockNormal;
      default:
        return undefined;
    }
  }
}

export default new UserDatabaseMock();
