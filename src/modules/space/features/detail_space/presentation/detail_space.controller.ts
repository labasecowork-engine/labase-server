import { Response } from "express";
import { DetailSpaceService } from "./detail_space.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class DetailSpaceController {
  constructor(private readonly service = new DetailSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const { id } = req.params;
    const space = await this.service.execute(id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Space detail",
          req.path,
          space
        )
      );
  }
}
