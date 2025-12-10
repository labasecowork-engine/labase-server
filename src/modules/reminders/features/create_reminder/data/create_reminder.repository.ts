import { reminder_frequency } from "@prisma/client";
import prisma from "../../../../../config/prisma_client";
import { Reminder } from "../domain/entities/reminder.entity";

export class CreateReminderRepository {
  async create(params: {
    name: string;
    phoneNumber: string;
    message: string;
    sendDate: Date;
    frequency: reminder_frequency;
  }): Promise<Reminder> {
    const created = await prisma.reminders.create({
      data: {
        name: params.name,
        phone_number: params.phoneNumber,
        message: params.message,
        send_date: params.sendDate,
        frequency: params.frequency,
        is_active: true,
      },
    });

    return {
      id: created.id,
      name: created.name,
      phoneNumber: created.phone_number,
      message: created.message,
      sendDate: created.send_date,
      frequency: created.frequency,
      isActive: created.is_active,
      createdAt: created.created_at,
      updatedAt: created.updated_at,
    };
  }
}
