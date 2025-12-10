import { z } from "zod";
import { unit_of_measure } from "@prisma/client";

export const CreateProductSchema = z.object({
  name: z
    .string({
      required_error: "El nombre del producto es obligatorio",
      invalid_type_error: "El nombre del producto debe ser una cadena (string)",
    })
    .min(1, "El nombre del producto no puede estar vacío"),

  brand_id: z
    .string({
      required_error: "El ID de la marca es obligatorio",
      invalid_type_error: "El ID de la marca debe ser una cadena (UUID)",
    })
    .uuid("El ID de la marca debe ser un UUID válido"),

  description: z
    .string({
      invalid_type_error: "La descripción debe ser una cadena de texto",
    })
    .optional(),

  observations: z
    .string({
      invalid_type_error: "Las observaciones deben ser una cadena de texto",
    })
    .optional(),

  quantity: z
    .number({
      required_error: "La cantidad es obligatoria",
      invalid_type_error: "La cantidad debe ser un número",
    })
    .int("La cantidad debe ser un número entero")
    .nonnegative("La cantidad no puede ser negativa"),

  unit_of_measure: z.nativeEnum(unit_of_measure, {
    errorMap: () => ({
      message: `La unidad de medida debe ser uno de los valores válidos: ${Object.values(
        unit_of_measure
      ).join(", ")}`,
    }),
  }),
});
