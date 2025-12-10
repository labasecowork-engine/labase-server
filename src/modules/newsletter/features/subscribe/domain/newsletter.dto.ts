import { z } from "zod";
import { MESSAGES } from "../../../../../constants";

export const subscribeNewsletterSchema = z
  .object({
    name: z
      .string({
        required_error: MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_REQUIRED_NAME,
      })
      .min(2, MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_INVALID_NAME_MIN_LENGTH),

    email: z
      .string({
        required_error: MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_REQUIRED_EMAIL,
      })
      .email(MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_INVALID_EMAIL)
      .regex(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|outlook\.com|hotmail\.com|yahoo\.com|protonmail\.com|icloud\.com|[\w-]+\.[a-z]{2,})$/,
        MESSAGES.NEWSLETTER.SUBSCRIBE_ERROR_UNSUPPORTED_DOMAIN
      ),
  })
  .strict();

export type SubscribeNewsletterDTO = z.infer<typeof subscribeNewsletterSchema>;
