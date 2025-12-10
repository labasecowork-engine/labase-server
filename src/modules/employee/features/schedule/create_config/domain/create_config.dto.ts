//src/modules/employee/features/schedule/create_config/domain/create_config.dto.ts
import { z } from "zod";
import { CreateEmployeeConfigSchema } from "./create_config.schema";
export type CreateEmployeeConfigDTO = z.infer<
  typeof CreateEmployeeConfigSchema
>;
