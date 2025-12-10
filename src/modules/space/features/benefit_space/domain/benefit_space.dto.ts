import { z } from "zod";
import { CreateBenefitSchema } from "./benefit_space.schema";
import { UpdateBenefitSchema } from "./update_benefit_space.schema";

export type CreateBenefitDTO = z.infer<typeof CreateBenefitSchema>;
export type UpdateBenefitDTO = z.infer<typeof UpdateBenefitSchema>;
