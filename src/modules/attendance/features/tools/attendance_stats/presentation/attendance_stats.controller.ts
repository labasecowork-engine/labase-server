// src/modules/attendance/features/tools/attendance_stats/presentation/attendance_stats.controller.ts
import { Response, Request } from "express";
import { AttendanceStatsSchema } from "../domain/attendance_stats.schema";
import { AttendanceStatsService } from "./attendance_stats.service";
import { buildHttpResponse } from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils";
import { AppError } from "../../../../../../types";

export class AttendanceStatsController {
  constructor(private readonly svc = new AttendanceStatsService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);

    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden ver estadísticas de asistencia",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = AttendanceStatsSchema.parse(req.query);
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Estadísticas de asistencia obtenidas correctamente"
        )
      );
  }
}
