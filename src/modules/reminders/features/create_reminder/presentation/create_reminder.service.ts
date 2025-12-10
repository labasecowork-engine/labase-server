import { CreateReminderRepository } from "../data/create_reminder.repository";
import { CreateReminderDTO } from "../domain/dtos/create_reminder.schema";

export class CreateReminderService {
  constructor(private readonly repo = new CreateReminderRepository()) {}

  async execute(dto: CreateReminderDTO) {
    const sendDate = new Date(dto.send_date);

    if (sendDate <= new Date()) {
      throw new Error("La fecha de envío debe ser futura");
    }

    const reminder = await this.repo.create({
      name: dto.name,
      phoneNumber: dto.phone_number,
      message: dto.message,
      sendDate,
      frequency: dto.frequency,
    });

    return {
      message: "Recordatorio creado exitosamente",
      reminder,
    };
  }
}
