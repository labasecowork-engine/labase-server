import { Response } from "express";
import { DeactivateSpaceService } from "./deactivate_space.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class DeactivateSpaceController {
  constructor(private readonly service = new DeactivateSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const space = await this.service.execute(req.params.id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Space deactivated",
          req.path,
          { space, user }
        )
      );
  }
}
