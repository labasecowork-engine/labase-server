import { z } from "zod";
import { DirectRegistrationSchema } from "./direct_registration.schema";

export type DirectRegistrationDTO = z.infer<typeof DirectRegistrationSchema>;

export interface DirectRegistrationResponseDTO {
  message: string;
  user: {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    user_type: string;
  };
}
