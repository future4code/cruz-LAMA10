import { CustomError } from "../../error/CustomError";
import { ShowInputDTO, WeekDay } from "../../model/Show";

export class ShowValidations {
  private validateWeekDay(weekDay: string) {
    if (!(weekDay in WeekDay)) {
      throw new CustomError("Week day invalid", 422);
    }
  }

  private validateRangeTime(startTime: number, endTime: number) {
    if (startTime < 8 || endTime > 23) {
      throw new CustomError("Range time invalid", 422);
    }
  }

  private validateIfHourIsNumber(startTime: number, endTime: number) {
    if (typeof startTime !== "number" || typeof endTime !== "number") {
      throw new CustomError("Invalid time", 422);
    }
  }

  protected validateSchedule(data: ShowInputDTO) {
    this.validateWeekDay(data.weekDay);
    this.validateRangeTime(data.startTime, data.endTime);
    this.validateIfHourIsNumber(data.startTime, data.endTime);
  }
}
