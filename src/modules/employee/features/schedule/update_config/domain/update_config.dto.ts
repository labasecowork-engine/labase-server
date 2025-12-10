//src/modules/employee/features/schedule/update_config/domain/update_config.dto.ts
import { z } from "zod";
import { UpdateEmployeeConfigSchema } from "./update_config.schema";
export type UpdateEmployeeConfigDTO = z.infer<
  typeof UpdateEmployeeConfigSchema
>;
