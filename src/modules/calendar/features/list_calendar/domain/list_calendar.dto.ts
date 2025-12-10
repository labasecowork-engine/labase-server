import { z } from "zod";
import { ListCalendarSchema } from "./list_calendar.schema";

export type ListCalendarDTO = z.infer<typeof ListCalendarSchema>;
