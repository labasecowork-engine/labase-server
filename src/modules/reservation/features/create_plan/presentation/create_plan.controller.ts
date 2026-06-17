import { Request, Response } from "express";
import { CreatePlanSchema } from "../domain/create_plan.schema";
import { CreatePlanService } from "./create_plan.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class CreatePlanController {
  constructor(private readonly service = new CreatePlanService()) {}

  async handle(req: Request, res: Response) {
    const dto = CreatePlanSchema.parse(req.body);
    const plan = await this.service.execute(dto);
    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Plan creado correctamente",
          req.path,
          plan
        )
      );
  }
}
