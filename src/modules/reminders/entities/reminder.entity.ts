import { reminder_frequency } from "@prisma/client";

export interface Reminder {
  id: string;
  name: string;
  phone_number: string;
  message: string;
  send_date: Date;
  frequency: reminder_frequency;
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
