import * as jwt from "jsonwebtoken";

export interface IAuthenticator {
  generateToken(input: AuthenticationData, expiresIn?: string): string;
  getTokenData(token: string): AuthenticationData;
}

export class Authenticator implements IAuthenticator {
  public generateToken(
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn,
      }
    );
    return token;
  }

  public getTokenData(token: string): AuthenticationData {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = {
      id: payload.id,
      role: payload.role,
    };
    return result;
  }
}

interface AuthenticationData {
  id: string;
  role?: string;
}

export default new Authenticator();
