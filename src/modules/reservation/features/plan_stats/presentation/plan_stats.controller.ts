import { Request, Response } from "express";
import { PlanStatsService } from "./plan_stats.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class PlanStatsController {
  constructor(private readonly service = new PlanStatsService()) {}

  async handle(req: Request, res: Response) {
    const stats = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Métricas de planes obtenidas correctamente",
          req.path,
          stats
        )
      );
  }
}
