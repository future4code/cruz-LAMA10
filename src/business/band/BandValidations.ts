import { CustomError } from "../../error/CustomError";
import { BandInputDTO } from "../../model/Band";

export class BandValidation {
  protected validateIfEmptyFields({
    musicGenre,
    name,
    responsible,
  }: BandInputDTO) {
    if (!musicGenre || !name || !responsible) {
      throw new CustomError("Missing input", 422);
    }
  }

  protected validateIfHasAField(id?: string, name?: string) {
    if (!id && !name) {
      throw new CustomError("At least one field is required", 422);
    }
  }
}
