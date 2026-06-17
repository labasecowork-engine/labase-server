import { Request, Response } from "express";
import { ListLockersService } from "./list_lockers.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListLockersController {
  constructor(private readonly service = new ListLockersService()) {}

  async list(req: Request, res: Response) {
    const lockers = await this.service.list();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Lockers obtenidos correctamente",
          req.path,
          lockers
        )
      );
  }

  async stats(req: Request, res: Response) {
    const stats = await this.service.stats();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Métricas de lockers obtenidas correctamente",
          req.path,
          stats
        )
      );
  }
}
