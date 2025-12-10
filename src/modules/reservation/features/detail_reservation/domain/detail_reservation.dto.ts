import { z } from "zod";
import { DetailReservationParamsSchema } from "./detail_reservation.schema";

export type DetailReservationParamsDTO = z.infer<
  typeof DetailReservationParamsSchema
>;
