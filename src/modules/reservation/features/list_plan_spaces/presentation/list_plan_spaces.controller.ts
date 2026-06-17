import { Request, Response } from "express";
import { ListPlanSpacesService } from "./list_plan_spaces.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListPlanSpacesController {
  constructor(private readonly service = new ListPlanSpacesService()) {}

  async handle(req: Request, res: Response) {
    const spaces = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Espacios obtenidos correctamente",
          req.path,
          spaces
        )
      );
  }
}
