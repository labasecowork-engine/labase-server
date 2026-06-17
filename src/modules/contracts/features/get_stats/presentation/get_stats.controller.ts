import { Request, Response } from "express";
import { GetStatsService } from "./get_stats.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class GetStatsController {
  constructor(private readonly service = new GetStatsService()) {}

  async handle(req: Request, res: Response) {
    const stats = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Métricas obtenidas correctamente",
          req.path,
          stats
        )
      );
  }
}
