import { z } from "zod";

export const GetProductsQuerySchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  search: z.string().trim().optional(),
  brand_id: z
    .string({
      invalid_type_error: "El ID de la marca debe ser una cadena (UUID)",
    })
    .uuid("El ID de la marca debe ser un UUID válido")
    .optional(),
  brand_name: z.string().trim().optional(),
});

export const GetProductParamSchema = z.object({
  id: z
    .string({
      required_error: "El ID del producto es obligatorio",
      invalid_type_error: "El ID del producto debe ser una cadena (UUID)",
    })
    .uuid("El ID del producto debe ser un UUID válido"),
});
