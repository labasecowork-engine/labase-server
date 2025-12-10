import { Response } from "express";
import { ActivateSpaceService } from "./activate_space.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
export class ActivateSpaceController {
  constructor(private readonly service = new ActivateSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const space = await this.service.execute(req.params.id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Space activated",
          req.path,
          { space, user }
        )
      );
  }
}
