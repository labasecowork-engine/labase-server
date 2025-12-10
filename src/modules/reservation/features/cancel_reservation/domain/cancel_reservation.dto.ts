import { z } from "zod";
import {
  CancelReservationParamsSchema,
  CancelReservationBodySchema,
} from "./cancel_reservation.schema";

export type CancelReservationParamsDTO = z.infer<
  typeof CancelReservationParamsSchema
>;
export type CancelReservationBodyDTO = z.infer<
  typeof CancelReservationBodySchema
>;
