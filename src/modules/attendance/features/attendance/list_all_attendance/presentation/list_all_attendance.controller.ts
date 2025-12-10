// src/modules/attendance/features/attendance/list_all_attendance/presentation/list_all_attendance.controller.ts
import { Response, Request } from "express";
import { ListAllAttendanceSchema } from "../domain/list_all_attendance.schema";
import { ListAllAttendanceService } from "./list_all_attendance.service";
import { buildHttpResponse } from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/";
import { AppError } from "../../../../../../types/";

export class ListAllAttendanceController {
  constructor(private readonly svc = new ListAllAttendanceService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);

    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden ver todas las asistencias",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = ListAllAttendanceSchema.parse(req.query);
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result,
          "Lista de todas las asistencias"
        )
      );
  }
}
