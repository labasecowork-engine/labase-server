//src/modules/attendance/features/policy_templates/get/presentation/list.controller.ts
import { Request, Response } from "express";
import { ListPolicyTemplatesSchema } from "../domain/list.schema";
import { ListPolicyTemplatesService } from "./list.service";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types";

export class ListPolicyTemplatesController {
  constructor(private readonly svc = new ListPolicyTemplatesService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden listar plantillas.",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = ListPolicyTemplatesSchema.parse({
      page: req.query.page,
      limit: req.query.limit,
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
          "Listado de plantillas obtenido correctamente"
        )
      );
  }
}
