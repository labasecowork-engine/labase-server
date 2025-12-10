//src/modules/attendance/features/policy_templates/create/presentation/create.controller.ts
import { Request, Response } from "express";
import { CreatePolicyTemplateSchema } from "../domain/create.schema";
import { CreatePolicyTemplateService } from "./create.service";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class CreatePolicyTemplateController {
  constructor(private readonly svc = new CreatePolicyTemplateService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden crear plantillas.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = CreatePolicyTemplateSchema.parse(req.body);
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          HttpStatusCodes.CREATED.message,
          req.path,
          result,
          "Plantilla de política creada correctamente"
        )
      );
  }
}
