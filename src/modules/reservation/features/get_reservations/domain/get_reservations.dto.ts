import { z } from "zod";
import { GetReservationsSchema } from "./get_reservations.schema";

export type GetReservationsDTO = z.infer<typeof GetReservationsSchema>;
