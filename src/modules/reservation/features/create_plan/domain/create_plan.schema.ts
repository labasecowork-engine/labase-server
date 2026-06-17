import { z } from "zod";

// Cuerpo compartido por create y update (un plan completo). `price` nulo = "A
// medida". `null` no se coacciona a número gracias al short-circuit de
// `.nullable()`.
export const PlanBodySchema = z.object({
  name: z.string().trim().min(1, "El nombre del plan es requerido"),
  price: z.coerce
    .number()
    .min(0, "El precio no puede ser negativo")
    .nullable()
    .optional(),
  category: z.enum(["individual", "team", "office", "shared_space"], {
    required_error: "La categoría es requerida",
  }),
  billing_period: z.enum(["day", "week", "month", "year"], {
    required_error: "El período de cobro es requerido",
  }),
  target_audience: z.string().trim().optional().nullable(),
  label_color: z
    .enum(["gold", "blue", "green", "purple", "rose", "stone"])
    .default("gold"),
  description: z.string().trim().optional().nullable(),
  features: z.array(z.string().trim()).default([]),
  space_ids: z.array(z.string().uuid()).default([]),
});

export type PlanBodyDTO = z.infer<typeof PlanBodySchema>;

export const CreatePlanSchema = PlanBodySchema;
export type CreatePlanDTO = PlanBodyDTO;
