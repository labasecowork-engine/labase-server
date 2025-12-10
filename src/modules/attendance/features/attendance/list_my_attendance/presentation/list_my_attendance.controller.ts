//src/modules/attendance/features/list_my_attendance/presentation/list_my_attendance.controller.ts
import { Response, Request } from "express";
import { ListMyAttendanceSchema } from "../domain/list_my_attendance.schema";
import { ListMyAttendanceService } from "./list_my_attendance.service";
import { buildHttpResponse } from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils/";
import { isEmployee } from "../../../../../../utils/";
import { AppError } from "../../../../../../types/";
import { MESSAGES } from "../../../../../../constants/messages";

export class ListMyAttendanceController {
  constructor(private readonly svc = new ListMyAttendanceService()) {}

  async handle(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (!isEmployee(user)) {
      throw new AppError(
        MESSAGES.ATTENDANCE.NOT_ALLOWED,
        HttpStatusCodes.FORBIDDEN.code
      );
    }
    const dto = ListMyAttendanceSchema.parse(req.query);
    const result = await this.svc.execute(user.id, dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          HttpStatusCodes.OK.message,
          req.path,
          result
        )
      );
  }
}
