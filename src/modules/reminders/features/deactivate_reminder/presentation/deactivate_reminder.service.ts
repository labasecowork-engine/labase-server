import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { DeactivateReminderRepository } from "../data/deactivate_reminder.repository";
import { DeactivateReminderParamsInput } from "../domain/deactivate_reminder.schema";

export class DeactivateReminderService {
  constructor(private readonly repo = new DeactivateReminderRepository()) {}

  async execute(params: DeactivateReminderParamsInput) {
    const existingReminder = await this.repo.findById(params.id);
    if (!existingReminder) {
      throw new AppError(
        "Recordatorio no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    await this.repo.deactivate(params.id);

    return {
      message: "Recordatorio desactivado exitosamente",
    };
  }
}
