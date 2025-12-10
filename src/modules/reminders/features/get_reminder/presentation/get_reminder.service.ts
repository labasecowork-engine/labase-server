import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { GetReminderRepository } from "../data/get_reminder.repository";
import { GetReminderParamsInput } from "../domain/get_reminder.schema";

export class GetReminderService {
  constructor(private readonly repo = new GetReminderRepository()) {}

  async execute(params: GetReminderParamsInput) {
    const reminder = await this.repo.findById(params.id);

    if (!reminder) {
      throw new AppError(
        "Recordatorio no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    return {
      message: "Recordatorio obtenido exitosamente",
      reminder,
    };
  }
}
