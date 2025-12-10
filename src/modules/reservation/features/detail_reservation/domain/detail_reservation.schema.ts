import { z } from "zod";

export const DetailReservationParamsSchema = z.object({
  id: z.string().uuid("ID de reserva inválido"),
});
