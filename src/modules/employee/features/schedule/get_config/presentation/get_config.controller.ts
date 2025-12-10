//src/modules/employee/features/schedule/get_config/presentation/get_config.controller.ts
import { Response, Request } from "express";
import { GetEmployeeConfigParamsSchema } from "../domain/get_config.schema";
import { GetEmployeeConfigService } from "./get_config.service";
import { buildHttpResponse } from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils";
import { isAdmin, isEmployee } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class GetEmployeeConfigController {
  constructor(private readonly svc = new GetEmployeeConfigService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);

    const params = GetEmployeeConfigParamsSchema.parse(req.params);
    const { employee_id } = params;

    const isOwner = isEmployee(user) && user.id === employee_id;
    if (!isAdmin(user) && !isOwner) {
      throw new AppError(
        "No tienes permisos para ver esta configuración.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const result = await this.svc.execute(employee_id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Configuración de asistencia obtenida correctamente"
        )
      );
  }
}
