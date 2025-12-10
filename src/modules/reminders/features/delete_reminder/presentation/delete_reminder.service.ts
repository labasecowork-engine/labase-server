import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { DeleteReminderRepository } from "../data/delete_reminder.repository";
import { DeleteReminderParamsInput } from "../domain/delete_reminder.schema";

export class DeleteReminderService {
  constructor(private readonly repo = new DeleteReminderRepository()) {}

  async execute(params: DeleteReminderParamsInput) {
    const existingReminder = await this.repo.findById(params.id);
    if (!existingReminder) {
      throw new AppError(
        "Recordatorio no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    await this.repo.delete(params.id);

    return {
      message: "Recordatorio eliminado exitosamente",
    };
  }
}
