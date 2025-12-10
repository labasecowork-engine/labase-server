// src/modules/employee/features/employee/update_employee/presentation/update_employee.controller.ts
import { Response } from "express";
import { UpdateEmployeeService } from "./update_employee.service";
import {
  UpdateEmployeeParamsSchema,
  UpdateEmployeeBodySchema,
} from "../domain/update_employee.schema";
import { buildHttpResponse } from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class UpdateEmployeeController {
  constructor(private readonly service = new UpdateEmployeeService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = UpdateEmployeeParamsSchema.parse(req.params);
    const body = UpdateEmployeeBodySchema.parse(req.body);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role,
    };

    const result = await this.service.execute(params.id, body, user);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
        employee_id: result.employee_id,
        user: result.user,
      })
    );
  }
}
