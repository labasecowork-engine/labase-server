import { z } from "zod";
import { CreateReservationSchema } from "./create_reservation.schema";

export type CreateReservationDTO = z.infer<typeof CreateReservationSchema>;

export interface CreateReservationResponseDTO {
  message: string;
  reservation_id: string;
  code_qr: string;
  price: number;
  status: "pending" | "confirmed" | "cancelled";
}
