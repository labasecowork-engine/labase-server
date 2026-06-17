import { Request, Response } from "express";
import { ListPlansQuerySchema } from "../domain/list_plans.schema";
import { ListPlansService } from "./list_plans.service";
import {
  buildHttpResponse,
  buildPaginationMeta,
  getPaginationParams,
} from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListPlansController {
  constructor(private readonly service = new ListPlansService()) {}

  async handle(req: Request, res: Response) {
    const query = ListPlansQuerySchema.parse(req.query);
    const { page, limit, skip } = getPaginationParams(req.query);
    const { plans, total } = await this.service.execute(query, {
      page,
      limit,
      skip,
    });

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Planes obtenidos correctamente",
          req.path,
          { plans, pagination: buildPaginationMeta(total, page, limit) }
        )
      );
  }
}
