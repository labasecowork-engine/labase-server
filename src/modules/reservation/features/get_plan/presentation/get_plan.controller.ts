import { Request, Response } from "express";
import { GetPlanParamsSchema } from "../domain/get_plan.schema";
import { GetPlanService } from "./get_plan.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class GetPlanController {
  constructor(private readonly service = new GetPlanService()) {}

  async handle(req: Request, res: Response) {
    const { id } = GetPlanParamsSchema.parse(req.params);
    const plan = await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Plan obtenido correctamente",
          req.path,
          plan
        )
      );
  }
}
