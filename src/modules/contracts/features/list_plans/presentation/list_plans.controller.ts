import { Request, Response } from "express";
import { ListPlansService } from "./list_plans.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListPlansController {
  constructor(private readonly service = new ListPlansService()) {}

  async handle(req: Request, res: Response) {
    const plans = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Planes obtenidos correctamente",
          req.path,
          plans
        )
      );
  }
}
