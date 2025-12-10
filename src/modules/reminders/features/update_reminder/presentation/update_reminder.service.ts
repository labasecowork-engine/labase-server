import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";
import { UpdateReminderRepository } from "../data/update_reminder.repository";
import {
  UpdateReminderParamsInput,
  UpdateReminderBodyInput,
} from "../domain/update_reminder.schema";

export class UpdateReminderService {
  constructor(private readonly repo = new UpdateReminderRepository()) {}

  async execute(
    params: UpdateReminderParamsInput,
    body: UpdateReminderBodyInput
  ) {
    const existingReminder = await this.repo.findById(params.id);
    if (!existingReminder) {
      throw new AppError(
        "Recordatorio no encontrado",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    let sendDate: Date | undefined;
    if (body.send_date) {
      sendDate = new Date(body.send_date);
      if (sendDate <= new Date()) {
        throw new AppError(
          "La fecha de envío debe ser futura",
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
    }

    const updatedReminder = await this.repo.update(params.id, {
      name: body.name,
      phoneNumber: body.phone_number,
      message: body.message,
      sendDate,
      frequency: body.frequency,
      isActive: body.is_active,
    });

    return {
      message: "Recordatorio actualizado exitosamente",
      reminder: updatedReminder,
    };
  }
}
