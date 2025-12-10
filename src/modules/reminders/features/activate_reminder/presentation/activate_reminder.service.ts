import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { ActivateReminderRepository } from "../data/activate_reminder.repository";
import { ActivateReminderParamsInput } from "../domain/activate_reminder.schema";

export class ActivateReminderService {
  constructor(private readonly repo = new ActivateReminderRepository()) {}

  async execute(params: ActivateReminderParamsInput) {
    const existingReminder = await this.repo.findById(params.id);
    if (!existingReminder) {
      throw new AppError(
        "Recordatorio no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    await this.repo.activate(params.id);

    return {
      message: "Recordatorio activado exitosamente",
    };
  }
}
