import { IBandDatabase } from "../../src/data/BandDatabase";
import { Band, BandToDB } from "../../src/model/Band";
import { bandMock } from "./bandMock";

export class BandDatabaseMock implements IBandDatabase {
  public async insertBand(band: BandToDB) {}

  public async selectBand(
    id?: string,
    name?: string
  ): Promise<Band | undefined> {
    if (id) {
      if (id !== bandMock.getId()) return undefined;
      return bandMock;
    }

    if (name) {
      if (name !== bandMock.getName()) return undefined;
      return bandMock;
    }
  }
}
