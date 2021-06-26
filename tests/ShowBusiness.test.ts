import { ShowBusiness } from "../src/business/show/ShowBusiness";
import { ShowInputDTO } from "../src/model/Show";
import idGeneratorMock from "./mocks/idGeneratorMock";
import showDatabaseMock from "./mocks/show/ShowDatabaseMock";
import tokenGeneratorMock from "./mocks/tokenGeneratorMock";

const showBusinessMock = new ShowBusiness(
  tokenGeneratorMock,
  idGeneratorMock,
  showDatabaseMock
);

describe("ShowBusiness", () => {
  describe("showSchedule", () => {
    test("Should catch error when token is empty", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "SEXTA",
          date: "30/06/2021",
          startTime: 9,
          endTime: 11,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, undefined);
      } catch (error) {
        expect(error.statusCode).toBe(401);
        expect(error.message).toBe("Unauthorized");
      }
    });

    test("Should catch error when week day is not SEXTA, SABADO or DOMINGO", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "SEGUNDOU",
          date: "30/06/2021",
          startTime: 9,
          endTime: 11,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Week day invalid");
      }
    });

    test("Should catch error when range time is incorrect", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "SEXTA",
          date: "30/06/2021",
          startTime: 6,
          endTime: 11,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Range time invalid");
      }
    });

    test("Should catch error when hour is not a number", async () => {
      expect.assertions(2);

      try {
        const incorrectHour: any = "9:30";

        const input: ShowInputDTO = {
          weekDay: "SEXTA",
          date: "30/06/2021",
          startTime: incorrectHour,
          endTime: 11,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Invalid time");
      }
    });

    test("Should catch error when date is already scheduled", async () => {
      expect.assertions(2);

      try {
        const input: ShowInputDTO = {
          weekDay: "SEXTA",
          date: "30/06/2021",
          startTime: 11,
          endTime: 12,
          bandId: "Coldplay",
        };

        await showBusinessMock.scheduleShow(input, "token");
      } catch (error) {
        expect(error.statusCode).toBe(403);
        expect(error.message).toBe("Date is already scheduled");
      }
    });

    test("Should return successful message", async () => {
      expect.assertions(1);

      try {
        const input: ShowInputDTO = {
          weekDay: "SEXTA",
          date: "30/06/2021",
          startTime: 15,
          endTime: 16,
          bandId: "Coldplay",
        };

        const result = await showBusinessMock.scheduleShow(input, "token");

        expect(result).toBe("Show scheduled successfully!");
      } catch (error) {
        console.log(error);
      }
    });
  });

  describe("GetShows", () => {
    test("Should catch error when week day is invalid", async () => {
      expect.assertions(2);

      try {
        await showBusinessMock.getShows("QUARTOU", "token");
      } catch (error) {
        expect(error.statusCode).toBe(422);
        expect(error.message).toBe("Week day is invalid");
      }
    });

    test("Should return bands", async () => {
      expect.assertions(2);

      try {
        const result = await showBusinessMock.getShows("SEXTA", "token");

        expect(result).toContainEqual({ name: "Coldplay", genre: "pop" });
        expect(result).toContainEqual({ name: "Queen", genre: "Arena Rock" });
      } catch (error) {
        console.log(error);
      }
    });
  });
});
