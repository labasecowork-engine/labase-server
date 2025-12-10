import { z } from "zod";
import { duration_unit, price_mode } from "@prisma/client";

export const EditSpaceSchema = z
  .object({
    name: z
      .string()
      .min(3, "El nombre debe tener al menos 3 caracteres")
      .max(120, "El nombre no puede exceder 120 caracteres")
      .optional(),
    description: z
      .string()
      .max(500, "La descripción no puede exceder 500 caracteres")
      .optional(),
    type: z
      .enum(["unit", "shared_site", "full_room"], {
        errorMap: () => ({
          message: "El tipo debe ser 'unit', 'shared_site' o 'full_room'",
        }),
      })
      .optional(),
    access: z
      .enum(["public", "private"], {
        errorMap: () => ({
          message: "El acceso debe ser 'public' o 'private'",
        }),
      })
      .optional(),
    capacity_min: z
      .number()
      .int("La capacidad mínima debe ser un número entero")
      .positive("La capacidad mínima debe ser un número positivo")
      .optional(),
    capacity_max: z
      .number()
      .int("La capacidad máxima debe ser un número entero")
      .positive("La capacidad máxima debe ser un número positivo")
      .optional(),
    allow_by_unit: z.boolean().optional(),
    allow_full_room: z.boolean().optional(),
    disabled: z.boolean().optional(),
    benefit_ids: z
      .array(z.string().uuid("Cada ID de beneficio debe ser un UUID válido"))
      .optional(),
    keep_images: z
      .array(
        z.object({
          id: z.string().uuid("El ID de la imagen debe ser un UUID válido"),
          url: z.string().url("La URL de la imagen debe ser válida"),
          position: z
            .number()
            .int()
            .min(0, "La posición debe ser un número entero no negativo"),
        })
      )
      .optional(),
    prices: z
      .array(
        z.object({
          duration: z.nativeEnum(duration_unit, {
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
          amount: z.number().positive("El precio debe ser mayor a 0"),
        })
      )
      .optional(),
  })
  .superRefine((d, ctx) => {
    if (d.capacity_min && d.capacity_max && d.capacity_max < d.capacity_min) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "La capacidad máxima debe ser mayor o igual a la capacidad mínima",
        path: ["capacity_max"],
      });
    }
  });

export type EditSpaceDTO = z.infer<typeof EditSpaceSchema>;
