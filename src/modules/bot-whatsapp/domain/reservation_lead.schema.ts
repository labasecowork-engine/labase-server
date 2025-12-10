import { z } from "zod";

export const SpaceEnum = z.enum([
  "unidad",
  "reserva",
  "bunker",
  "brigada",
  "base de mando",
  "el arsenal",
  "el hangar",
  "base operativa",
]);
export type Space = z.infer<typeof SpaceEnum>;

const capacityBySpace: Record<Space, { min: number; max: number }> = {
  unidad: { min: 1, max: 1 },
  reserva: { min: 2, max: 2 },
  bunker: { min: 2, max: 4 },
  brigada: { min: 2, max: 4 },
  "base de mando": { min: 2, max: 10 },
  "el arsenal": { min: 3, max: 6 },
  "el hangar": { min: 1, max: 20 },
  "base operativa": { min: 1, max: 30 },
};

const time12or24h =
  /^(?:([01]?\d|2[0-3]):[0-5]\d(?:\s?[APap][Mm])?|([1-9]|1[0-2]):[0-5]\d\s?[APap][Mm])$/;

export const ReservationLeadSchema = z
  .object({
    name: z.string().min(2, "Nombre requerido"),
    phone: z
      .string()
      .regex(/^9\d{8}$/, "Celular peruano (9 dígitos, inicia con 9)"),

    space: SpaceEnum,
    people: z.number().int().positive().max(30),

    date: z.string().min(3),
    start_time: z
      .string()
      .regex(time12or24h, "Formato válido: 09:30 o 9:30 AM"),
    end_time: z.string().regex(time12or24h, "Formato válido: 18:45 o 6:45 PM"),

    purpose: z.string().min(3).max(200),

    channel: z.literal("whatsapp").default("whatsapp"),
    wa_from: z.string().min(3),
  })
  .superRefine((val, ctx) => {
    const range = capacityBySpace[val.space];
    if (val.people < range.min || val.people > range.max) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `Capacidad para "${val.space}": ${range.min}–${range.max} personas.`,
        path: ["people"],
      });
    }
  });

export type ReservationLead = z.infer<typeof ReservationLeadSchema>;
