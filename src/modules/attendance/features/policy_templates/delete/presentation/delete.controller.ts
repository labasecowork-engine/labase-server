//src/modules/attendance/features/policy_templates/delete/presentation/delete.controller.ts
import { Request, Response } from "express";
import { DeletePolicyTemplateSchema } from "../domain/delete.schema";
import { DeletePolicyTemplateService } from "./delete.service";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class DeletePolicyTemplateController {
  constructor(private readonly svc = new DeletePolicyTemplateService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden eliminar plantillas.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = DeletePolicyTemplateSchema.parse({ id: req.params.id });
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Plantilla de política eliminada correctamente"
        )
      );
  }
}
