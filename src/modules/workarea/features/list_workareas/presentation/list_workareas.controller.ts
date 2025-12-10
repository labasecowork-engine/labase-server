import { Response } from "express";
import { ListWorkAreasService } from "./list_workareas.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListWorkAreasController {
  constructor(private readonly service = new ListWorkAreasService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(buildHttpResponse(HttpStatusCodes.OK.code, "OK", req.path, result));
  }
}
