import { UserInputDTO, LoginInputDTO } from "../model/User";
import { IUserDatabase } from "../data/UserDatabase";
import { IIdGenerator } from "../services/IdGenerator";
import { IAuthenticator } from "../services/Authenticator";
import { IHashManager } from "../services/HashManager";

export class UserBusiness {
  constructor(
    private authenticator: IAuthenticator,
    private hashManager: IHashManager,
    private idGenerator: IIdGenerator,
    private userDatabase: IUserDatabase
  ) {}

  async createUser(user: UserInputDTO) {
    const id = this.idGenerator.generate();

    const hashPassword = this.hashManager.hash(user.password);

    await this.userDatabase.createUser(
      id,
      user.email,
      user.name,
      hashPassword,
      user.role
    );

    const accessToken = this.authenticator.generateToken({
      id,
      role: user.role,
    });

    return accessToken;
  }

  async getUserByEmail(user: LoginInputDTO) {
    const userFromDB = await this.userDatabase.getUserByMail(user.email);

    const hashCompare = this.hashManager.compare(
      user.password,
      userFromDB.getPassword()
    );

    const accessToken = this.authenticator.generateToken({
      id: userFromDB.getId(),
      role: userFromDB.getRole(),
    });

    if (!hashCompare) {
      throw new Error("Invalid Password!");
    }

    return accessToken;
  }
}
