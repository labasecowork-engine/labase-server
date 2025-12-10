import { z } from "zod";
import { CreatePaymentSchema } from "./create-payment.schema";

export type CreatePaymentDTO = z.infer<typeof CreatePaymentSchema>;
