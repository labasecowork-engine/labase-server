import { z } from "zod";
import { inquirySchema } from "./inquiry.schema";

export type inquiryDTO = z.infer<typeof inquirySchema>;
