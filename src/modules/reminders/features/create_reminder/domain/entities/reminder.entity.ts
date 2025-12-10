import { reminder_frequency } from "@prisma/client";

export interface Reminder {
  id: string;
  name: string;
  phoneNumber: string;
  message: string;
  sendDate: Date;
  frequency: reminder_frequency;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
