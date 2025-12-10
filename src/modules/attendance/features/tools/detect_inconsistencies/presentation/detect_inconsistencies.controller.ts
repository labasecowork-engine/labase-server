//src/modules/attendance/features/detect_inconsistencies/presentation/detect_inconsistencies.controller.ts
import { Response, Request } from "express";
import { DetectInconsistenciesSchema } from "../domain/detect_inconsistencies.schema";
import { DetectInconsistenciesService } from "./detect_inconsistencies.service";
import { buildHttpResponse } from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/";
import { isAdmin } from "../../../../../../utils/permissions";
import { AppError } from "../../../../../../types/";

export class DetectInconsistenciesController {
  constructor(private readonly svc = new DetectInconsistenciesService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isAdmin(user)) {
      throw new AppError(
        "Solo los administradores pueden ejecutar esta verificación",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = DetectInconsistenciesSchema.parse(req.body); // POST con JSON
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Detección de inconsistencias ejecutada correctamente"
        )
      );
  }
}
