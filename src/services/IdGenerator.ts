import { v4 } from "uuid";

export interface IIdGenerator {
  generate(): string;
}

export class IdGenerator implements IIdGenerator {
  generate(): string {
    return v4();
  }
}

// Um CONTRATO é um conjunto de regras e o IMPLEMENTS é o cumprir o contrato.
