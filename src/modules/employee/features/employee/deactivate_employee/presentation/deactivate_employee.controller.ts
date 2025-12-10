// src/modules/employee/features/employee/deactivate_employee/presentation/deactivate_employee.controller.ts
import { Response } from "express";
import { DeactivateEmployeeService } from "./deactivate_employee.service";
import { DeactivateEmployeeParamsSchema } from "../domain/deactivate_employee.schema";
import { buildHttpResponse } from "../../../../../../utils";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { getAuthenticatedUser } from "../../../../../../utils";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class DeactivateEmployeeController {
  constructor(private readonly service = new DeactivateEmployeeService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = DeactivateEmployeeParamsSchema.parse(req.params);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(params.id, user);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
        employee_id: result.employee_id,
        user: result.user,
      })
    );
  }
}
