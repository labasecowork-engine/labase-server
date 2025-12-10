//src/modules/attendance/features/policy_templates/get/domain/list.dto.ts
import { z } from "zod";
import { ListPolicyTemplatesSchema } from "./list.schema";

export type ListPolicyTemplatesDTO = z.infer<typeof ListPolicyTemplatesSchema>;
