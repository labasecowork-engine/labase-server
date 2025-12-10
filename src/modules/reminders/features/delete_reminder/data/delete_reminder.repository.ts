import prisma from "../../../../../config/prisma_client";
import { Reminder } from "../../../entities/reminder.entity";

export class DeleteReminderRepository {
  async findById(id: string): Promise<Reminder | null> {
    const reminder = await prisma.reminders.findUnique({
      where: { id },
    });

    if (!reminder) return null;

    return {
      id: reminder.id,
      name: reminder.name,
      phoneNumber: reminder.phone_number,
      message: reminder.message,
      sendDate: reminder.send_date,
      frequency: reminder.frequency,
      isActive: reminder.is_active,
      createdAt: reminder.created_at,
      updatedAt: reminder.updated_at,
    };
  }

  async delete(id: string): Promise<void> {
    await prisma.reminders.delete({
      where: { id },
    });
  }
}
