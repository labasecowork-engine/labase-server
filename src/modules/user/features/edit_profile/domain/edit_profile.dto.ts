import { z } from "zod";
import { EditProfileSchema } from "./edit_profile.schema";

export type EditProfileDTO = z.infer<typeof EditProfileSchema>;
