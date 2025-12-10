import { reminder_frequency } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";
import { Reminder } from "../../../entities/reminder.entity";

export class UpdateReminderRepository {
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

  async update(
    id: string,
    params: {
      name?: string;
      phoneNumber?: string;
      message?: string;
      sendDate?: Date;
      frequency?: reminder_frequency;
      isActive?: boolean;
    }
  ): Promise<Reminder> {
    const updated = await prisma.reminders.update({
      where: { id },
      data: {
        ...(params.name !== undefined && { name: params.name }),
        ...(params.phoneNumber !== undefined && {
          phone_number: params.phoneNumber,
        }),
        ...(params.message !== undefined && { message: params.message }),
        ...(params.sendDate !== undefined && { send_date: params.sendDate }),
        ...(params.frequency !== undefined && { frequency: params.frequency }),
        ...(params.isActive !== undefined && { is_active: params.isActive }),
      },
    });

    return {
      id: updated.id,
      name: updated.name,
      phoneNumber: updated.phone_number,
      message: updated.message,
      sendDate: updated.send_date,
      frequency: updated.frequency,
      isActive: updated.is_active,
      createdAt: updated.created_at,
      updatedAt: updated.updated_at,
    };
  }
}
