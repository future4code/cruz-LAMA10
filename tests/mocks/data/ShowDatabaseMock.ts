import { IShowDatabase } from "../../../src/data/ShowDatabase";
import { ShowDataDTO } from "../../../src/model/Show";

export class ShowDatabaseMock implements IShowDatabase {
  public async createShow(data: ShowDataDTO): Promise<any> {}

  public async checkSameDate(
    week_day: string,
    start_time: number,
    end_time: number
  ): Promise<any> {
    if (week_day === "SEXTA" && start_time === 11 && end_time === 12) {
      return {};
    }
    return undefined;
  }

  public async getShowsByDay(week_day: string): Promise<any[] | []> {
    if (week_day === "SEXTA") {
      return [
        { name: "Coldplay", genre: "pop" },
        { name: "Queen", genre: "Arena Rock" },
      ];
    }

    return [];
  }
}

export default new ShowDatabaseMock();
