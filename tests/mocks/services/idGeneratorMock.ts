import { IIdGenerator } from "../../../src/services/IdGenerator";

export class IdGeneratorMock implements IIdGenerator {
  public generate(): string {
    return "id_mock";
  }
}

export default new IdGeneratorMock();
