//src/modules/attendance/features/policy_templates/get/presentation/get.controller.ts
import { Request, Response } from "express";
import { GetPolicyTemplateSchema } from "../domain/get.schema";
import { GetPolicyTemplateService } from "./get.service";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class GetPolicyTemplateController {
  constructor(private readonly svc = new GetPolicyTemplateService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden ver plantillas.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = GetPolicyTemplateSchema.parse({ id: req.params.id });
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Plantilla obtenida correctamente"
        )
      );
  }
}
