import { Band, BandToDB } from "../model/Band";
import { BaseDatabase } from "./BaseDatabase";

export interface IBandDatabase {
  insertBand(band: BandToDB): Promise<void>;
  selectBand(id?: string, name?: string): Promise<Band | undefined>;
}

export class BandDatabase extends BaseDatabase implements IBandDatabase {
  private table = "lama_bands";
  public async insertBand(band: BandToDB): Promise<void> {
    await this.getConnection().table(this.table).insert(band);
  }

  public async selectBand(
    id?: string,
    name?: string
  ): Promise<Band | undefined> {
    if (id) {
      return await this.selectBandById(id);
    }

    if (name) {
      return await this.selectBandByName(name);
    }
  }

  private async selectBandById(id: string): Promise<Band | undefined> {
    const [result] = await this.getConnection()
      .table(this.table)
      .select()
      .where({ id });

    if (!result) {
      return undefined;
    }

    return new Band(
      result.id,
      result.name,
      result.music_genre,
      result.responsible
    );
  }

  private async selectBandByName(name: string): Promise<Band | undefined> {
    const [result] = await this.getConnection()
      .table(this.table)
      .select()
      .where({ name });

    if (!result) {
      return undefined;
    }

    return new Band(
      result.id,
      result.name,
      result.music_genre,
      result.responsible
    );
  }
}
