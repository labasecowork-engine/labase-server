//src/modules/attendance/features/policy_templates/update/presentation/update.controller.ts
import { Request, Response } from "express";
import { UpdatePolicyTemplateSchema } from "../domain/update.schema";
import { UpdatePolicyTemplateService } from "./update.service";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class UpdatePolicyTemplateController {
  constructor(private readonly svc = new UpdatePolicyTemplateService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden actualizar plantillas.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = UpdatePolicyTemplateSchema.parse({
      id: req.params.id,
      body: req.body,
    });

    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Plantilla de política actualizada correctamente"
        )
      );
  }
}
