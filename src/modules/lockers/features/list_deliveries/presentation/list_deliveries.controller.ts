import { Request, Response } from "express";
import { ListDeliveriesService } from "./list_deliveries.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListDeliveriesController {
  constructor(private readonly service = new ListDeliveriesService()) {}

  async handle(req: Request, res: Response) {
    const deliveries = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Entregas activas obtenidas correctamente",
          req.path,
          deliveries
        )
      );
  }
}
