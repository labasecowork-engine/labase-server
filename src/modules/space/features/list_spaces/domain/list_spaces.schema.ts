import { z } from "zod";

export const ListSpacesSchema = z.object({
  type: z
    .enum(["unit", "shared_site", "full_room"], {
      errorMap: () => ({
        message:
          "El tipo de espacio debe ser 'unit', 'shared_site' o 'full_room'",
      }),
    })
    .optional(),

  capacity: z
    .number({
      invalid_type_error: "La capacidad debe ser un número",
    })
    .int("La capacidad debe ser un número entero")
    .positive("La capacidad debe ser mayor a 0")
    .optional(),

  available: z
    .boolean({
      invalid_type_error: "El campo disponible debe ser un valor booleano",
    })
    .optional()
    .default(true),

  status: z
    .enum(["active", "inactive", "all"], {
      errorMap: () => ({
        message: "El estado debe ser 'active', 'inactive' o 'all'",
      }),
    })
    .optional()
    .default("active"),
});
