import prisma from "../../../../../config/prisma_client";
import { Reminder } from "../../../entities/reminder.entity";

export class ActivateReminderRepository {
  async findById(id: string): Promise<Reminder | null> {
    const reminder = await prisma.reminders.findUnique({
      where: { id },
    });

    if (!reminder) return null;

    return {
      id: reminder.id,
      name: reminder.name,
      phone_number: reminder.phone_number,
      message: reminder.message,
      send_date: reminder.send_date,
      frequency: reminder.frequency,
      is_active: reminder.is_active,
      created_at: reminder.created_at,
      updated_at: reminder.updated_at,
    };
  }

  async activate(id: string): Promise<void> {
    await prisma.reminders.update({
      where: { id },
      data: { is_active: true },
    });
  }
}