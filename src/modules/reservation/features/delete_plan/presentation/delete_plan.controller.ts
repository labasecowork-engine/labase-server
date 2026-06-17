import { Request, Response } from "express";
import { DeletePlanParamsSchema } from "../domain/delete_plan.schema";
import { DeletePlanService } from "./delete_plan.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeletePlanController {
  constructor(private readonly service = new DeletePlanService()) {}

  async handle(req: Request, res: Response) {
    const { id } = DeletePlanParamsSchema.parse(req.params);
    await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Plan eliminado correctamente",
          req.path
        )
      );
  }
}
