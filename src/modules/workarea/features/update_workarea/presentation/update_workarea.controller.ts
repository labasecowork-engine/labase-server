import { Response } from "express";
import { UpdateWorkAreaService } from "./update_workarea.service";
import {
  UpdateWorkAreaSchema,
  UpdateWorkAreaParamsSchema,
} from "../domain/update_workarea.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class UpdateWorkAreaController {
  constructor(private readonly service = new UpdateWorkAreaService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = UpdateWorkAreaParamsSchema.parse(req.params);
    const dto = UpdateWorkAreaSchema.parse(req.body);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(params.id, dto, user);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
        workarea: result.workarea,
      })
    );
  }
}
