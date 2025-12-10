// src/modules/employee/features/employee/activate_employee/presentation/activate_employee.controller.ts
import { Response } from "express";
import { ActivateEmployeeService } from "./activate_employee.service";
import { ActivateEmployeeParamsSchema } from "../domain/activate_employee.schema";
import { buildHttpResponse } from "../../../../../../utils";
import {
  handleServerError,
  handleZodError,
} from "../../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { getAuthenticatedUser } from "../../../../../../utils";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class ActivateEmployeeController {
  constructor(private readonly service = new ActivateEmployeeService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    try {
      const params = ActivateEmployeeParamsSchema.parse(req.params);
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
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  }
}
