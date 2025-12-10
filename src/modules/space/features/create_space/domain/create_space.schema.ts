import { z } from "zod";
import { duration_unit, price_mode } from "@prisma/client";

export const CreateSpaceSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(120, "El nombre no debe exceder 120 caracteres"),

    description: z
      .string()
      .max(500, "La descripción no debe exceder 500 caracteres")
      .optional(),

    type: z.enum(["unit", "shared_site", "full_room"], {
      errorMap: () => ({
        message: "El tipo debe ser: unit, shared_site o full_room",
      }),
    }),

    capacity_min: z
      .number()
      .int("La capacidad mínima debe ser un número entero")
      .positive("La capacidad mínima debe ser mayor a 0"),

    capacity_max: z
      .number()
      .int("La capacidad máxima debe ser un número entero")
      .positive("La capacidad máxima debe ser mayor a 0"),

    allow_by_unit: z.boolean().optional().default(false),

    allow_full_room: z.boolean().optional().default(false),

    access: z
      .enum(["public", "private"], {
        errorMap: () => ({ message: "El acceso debe ser: public o private" }),
      })
      .optional()
      .default("public"),

    prices: z
      .array(
        z.object({
          unit: z.nativeEnum(duration_unit, {
            errorMap: () => ({
              message:
                "La unidad de duración debe ser: hour, day, week o month",
            }),
          }),
          mode: z.nativeEnum(price_mode, {
            errorMap: () => ({
              message: "El modo de precio debe ser: individual o group",
            }),
          }),
          value: z.number().positive("El precio debe ser mayor a 0"),
        })
      )
      .min(1, "Debe proveer al menos un precio"),

    benefit_ids: z
      .array(z.string().uuid("Cada ID de beneficio debe ser un UUID válido"))
      .optional()
      .default([]),
  })
  .superRefine((data, ctx) => {
    if (data.capacity_max < data.capacity_min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "La capacidad máxima debe ser mayor o igual a la capacidad mínima",
        path: ["capacity_max"],
      });
    }
  });
