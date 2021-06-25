import { IBandDatabase } from "../../data/BandDatabase";
import { BandInputDTO } from "../../model/Band";

export class BandBusiness {
  constructor(private bandDatabase: IBandDatabase) {}

  createBand(input: BandInputDTO) {}
}
