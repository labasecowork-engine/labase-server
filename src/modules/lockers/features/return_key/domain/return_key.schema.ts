import { z } from "zod";

export const ReturnKeySchema = z.object({
  id: z.string().uuid("Identificador de entrega inválido"),
});

export type ReturnKeyDTO = z.infer<typeof ReturnKeySchema>;
