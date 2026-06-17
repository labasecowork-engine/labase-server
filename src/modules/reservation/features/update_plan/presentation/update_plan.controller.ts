import { Request, Response } from "express";
import {
  UpdatePlanBodySchema,
  UpdatePlanParamsSchema,
} from "../domain/update_plan.schema";
import { UpdatePlanService } from "./update_plan.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdatePlanController {
  constructor(private readonly service = new UpdatePlanService()) {}

  async handle(req: Request, res: Response) {
    const { id } = UpdatePlanParamsSchema.parse(req.params);
    const dto = UpdatePlanBodySchema.parse(req.body);
    const plan = await this.service.execute(id, dto);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Plan actualizado correctamente",
          req.path,
          plan
        )
      );
  }
}
