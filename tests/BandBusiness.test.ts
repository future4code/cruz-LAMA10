import { BandBusiness } from "../src/business/band/BandBusiness";
import { BandDatabaseMock } from "./mocks/data/BandDatabaseMock";
import { TokenGeneratorMock } from "./mocks/services/tokenGeneratorMock";
import { IdGeneratorMock } from "./mocks/services/idGeneratorMock";
import { BandInputDTO, Band } from "../src/model/Band";
import { bandMock } from "./mocks/bandMock";

const bandBusiness = new BandBusiness(
  new BandDatabaseMock(),
  new TokenGeneratorMock(),
  new IdGeneratorMock()
);

describe("BandBusiness", () => {
  describe("Create Band", () => {
    test("Should catch error when token is missing", async () => {
      expect.assertions(2);
      try {
        const input: BandInputDTO = {
          musicGenre: "American Funk",
          name: "Scary Pockets",
          responsible: "Ryan Lerman",
        };

        await bandBusiness.createBand(input, undefined);
      } catch (error) {
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Token is missing");
      }
    });

    test("Should catch error when a input field is empty", async () => {
      expect.assertions(2);

      try {
        const input: BandInputDTO = {
          musicGenre: "",
          name: "Scary Pockets",
          responsible: "Ryan Lerman",
        };

        await bandBusiness.createBand(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Missing input");
      }
    });

    test("Should catch error when role is not 'admin'", async () => {
      expect.assertions(2);

      try {
        const input: BandInputDTO = {
          musicGenre: "American Funk",
          name: "Scary Pockets",
          responsible: "Ryan Lerman",
        };

        await bandBusiness.createBand(input, "normal");
      } catch (error) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe("Operation requires permission");
      }
    });

    test("Should return a sucess message when all datas is correct", async () => {
      expect.assertions(1);

      try {
        const input: BandInputDTO = {
          musicGenre: "American Funk",
          name: "Scary Pockets",
          responsible: "Ryan Lerman",
        };

        const result = await bandBusiness.createBand(input, "admin");

        expect(result).toBe("Band successfully registered");
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("Get Band By Id or Name", () => {
    test("Should catch error when all fields are invalid", async () => {
      expect.assertions(2);
      try {
        await bandBusiness.getBandBy(undefined, undefined);
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("At least one field is required");
      }
    });

    test("Should catch error when id is incorrect", async () => {
      expect.assertions(2);
      try {
        await bandBusiness.getBandBy("id");
      } catch (error) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Band not found");
      }
    });

    test("Should catch error when name is incorrect", async () => {
      expect.assertions(2);
      try {
        await bandBusiness.getBandBy(undefined, "Scary Pockets");
      } catch (error) {
        expect(error.statusCode).toBe(404);
        expect(error.message).toBe("Band not found");
      }
    });

    test("Should return band when id is valid", async () => {
      expect.assertions(2);
      try {
        const band = await bandBusiness.getBandBy("id_mock");

        expect(band).toBeInstanceOf(Band);
        expect(band).toContainEqual(bandMock);
      } catch (error) {
        console.log(error);
      }
    });

    test("Should return band when name is valid", async () => {
      expect.assertions(2);
      try {
        const band = await bandBusiness.getBandBy(undefined, "Queen");

        expect(band).toBeInstanceOf(Band);
        expect(band).toContainEqual(bandMock);
      } catch (error) {
        console.log(error);
      }
    });
  });
});
