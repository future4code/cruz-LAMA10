import { IBandDatabase, BandDatabase } from "../../data/BandDatabase";
import { BandInputDTO, Band } from "../../model/Band";
import { CustomError } from "../../error/CustomError";
import { IAuthenticator, Authenticator } from "../../services/Authenticator";
import { IIdGenerator, IdGenerator } from "../../services/IdGenerator";
import { BandValidation } from "./BandValidations";

export class BandBusiness extends BandValidation {
  constructor(
    private bandDatabase: IBandDatabase,
    private authenticator: IAuthenticator,
    private idGenerator: IIdGenerator
  ) {
    super();
  }

  public async createBand(input: BandInputDTO, token: string | undefined) {
    if (!token) throw new CustomError("Token is missing", 401);
    this.validateIfEmptyFields(input);

    const { role } = this.authenticator.getData(token);

    if (!role || role !== "ADMIN") {
      throw new CustomError("Operation requires permission", 403);
    }

    const band = new Band(
      this.idGenerator.generate(),
      input.name,
      input.musicGenre,
      input.responsible
    );

    await this.bandDatabase.insertBand(band.BandToDB());

    return "Band successfully registered";
  }

  public async getBandBy(id?: string, name?: string) {
    this.validateIfHasAField(id, name);

    const band = await this.bandDatabase.selectBand(id, name);

    if (!band) throw new CustomError("Band not found", 404);

    return band;
  }
}

export default new BandBusiness(
  new BandDatabase(),
  new Authenticator(),
  new IdGenerator()
);
