import { z } from "zod";

// Esquema de validación para los query parameters
export const listMyReservationsQuerySchema = z.object({
  limit: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 10))
    .refine((val) => val > 0 && val <= 100, {
      message: "El límite debe estar entre 1 y 100",
    }),
  page: z
    .string()
    .optional()
    .transform((val) => (val ? parseInt(val, 10) : 1))
    .refine((val) => val > 0, {
      message: "La página debe ser mayor a 0",
    }),
  search: z.string().optional(),
  space_id: z.string().uuid().optional(),
  date_from: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "date_from debe ser una fecha válida"
    ),
  date_to: z
    .string()
    .optional()
    .refine(
      (val) => !val || !isNaN(Date.parse(val)),
      "date_to debe ser una fecha válida"
    ),
  status: z
    .enum(["pending", "confirmed", "cancelled", "in_progress"])
    .optional(),
});

export type ListMyReservationsQuery = z.infer<
  typeof listMyReservationsQuerySchema
>;

export interface ListMyReservationsDTO {
  limit: number;
  page: number;
  search?: string;
  space_id?: string;
  date_from?: string;
  date_to?: string;
  status?: "pending" | "confirmed" | "cancelled" | "in_progress";
}
