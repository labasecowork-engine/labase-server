import { Response } from "express";
import { buildHttpResponse } from "../../../../../utils/http_response";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { GetVisitorsService } from "./get_visitors.service";
import {
  GetVisitorsQuerySchema,
  GetVisitorParamSchema,
} from "../domain/get_visitors.schema";
import type { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class GetVisitorsController {
  constructor(private readonly service = new GetVisitorsService()) {}

  async getAll(req: AuthenticatedRequest, res: Response) {
    const query = GetVisitorsQuerySchema.parse(req.query);
    const data = await this.service.getAll(query);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Visitors list",
          req.path,
          data
        )
      );
  }

  async getOne(req: AuthenticatedRequest, res: Response) {
    const { id } = GetVisitorParamSchema.parse(req.params);
    const data = await this.service.getOne(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Visitor detail",
          req.path,
          data
        )
      );
  }
}
