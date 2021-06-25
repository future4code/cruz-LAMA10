import { IHashManager } from "../../src/services/HashManager";

export class HashGeneratorMock implements IHashManager {
  public hash = (s: string): string => {
    return s;
  };

  public compare = (s: string, hash: string): boolean => {
    return s === hash;
  };
}

export default new HashGeneratorMock();
