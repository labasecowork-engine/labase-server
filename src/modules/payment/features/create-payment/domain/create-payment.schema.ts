import { z } from "zod";

export const locationDataMap = z.object({
  urlAddress: z.string().url(),
  serviceLocationCityName: z.string().max(50),
  serviceLocationCountrySubdivisionCode: z.string().length(3),
  serviceLocationCountryCode: z.string().length(3),
  serviceLocationPostalCode: z.string().max(10),
});

export const CreatePaymentSchema = z.object({
  reservationId: z.string().uuid(),
  metadata: z
    .object({
      antifraud: z
        .object({
          clientIp: z.string().optional(),
          merchantDefineData: z.record(z.any()).optional(),
        })
        .optional(),
      dataMap: locationDataMap.optional(),
    })
    .optional(),
});

export type CreatePaymentDTO = z.infer<typeof CreatePaymentSchema>;
