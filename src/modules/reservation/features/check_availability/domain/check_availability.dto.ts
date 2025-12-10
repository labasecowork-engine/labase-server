import { z } from "zod";
import { CheckAvailabilitySchema } from "./check_availability.schema";

export type CheckAvailabilityDTO = z.infer<typeof CheckAvailabilitySchema>;
