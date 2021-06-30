import showDatabase, { IShowDatabase } from "../../data/ShowDatabase";
import { CustomError } from "../../error/CustomError";
import { Show, ShowInputDTO, WeekDay } from "../../model/Show";
import authenticator, { IAuthenticator } from "../../services/Authenticator";
import idGenerator, { IIdGenerator } from "../../services/IdGenerator";
import { ShowValidations } from "./ShowValidations";

export class ShowBusiness extends ShowValidations {
  constructor(
    private authenticator: IAuthenticator,
    private idGenerator: IIdGenerator,
    private showDatabase: IShowDatabase
  ) {
    super();
  }

  async scheduleShow(show: ShowInputDTO, token: string | undefined) {
    this.validateToken(token);

    this.validateSchedule(show);

    const result = await this.showDatabase.checkSameDate(
      show.weekDay,
      show.startTime,
      show.endTime
    );

    if (result) {
      throw new CustomError("Date is already scheduled", 403);
    }

    const id = this.idGenerator.generate();

    const date = this.formatInputData(show.date);

    const weekDay = Show.stringToWeekDay(show.weekDay);

    const newShow = new Show(
      id,
      weekDay,
      date,
      show.startTime,
      show.endTime,
      show.bandId
    );

    await this.showDatabase.createShow(newShow.showToDatabase());

    return "Show scheduled successfully!";
  }

  async getShows(weekDay: string, token: string | undefined) {
    this.validateToken(token);

    if (!(weekDay in WeekDay)) {
      throw new CustomError("Week day is invalid", 422);
    }
    const bands = await this.showDatabase.getShowsByDay(weekDay);

    return bands;
  }

  private validateToken(token: string | undefined) {
    if (!token) {
      throw new CustomError("Unauthorized", 401);
    }

    this.authenticator.getTokenData(token);
  }

  private formatInputData(data: string): string {
    let splitDate = data.split(/\D/);
    return splitDate.reverse().join("-");
  }
}

export default new ShowBusiness(authenticator, idGenerator, showDatabase);
