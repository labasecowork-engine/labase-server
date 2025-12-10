//src/modules/employee/features/schedule/create_config/presentation/create_config.controller.ts
import { Response, Request } from "express";
import { CreateEmployeeConfigSchema } from "../domain/create_config.schema";
import { CreateEmployeeConfigService } from "./create_config.service";
import { buildHttpResponse } from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class CreateEmployeeConfigController {
  constructor(private readonly svc = new CreateEmployeeConfigService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden crear/actualizar configuración.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = CreateEmployeeConfigSchema.parse(req.body);
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Configuración de asistencia creada correctamente"
        )
      );
  }
}
