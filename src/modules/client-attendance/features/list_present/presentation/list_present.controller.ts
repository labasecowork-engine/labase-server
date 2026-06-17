import { Request, Response } from "express";
import { ListPresentService } from "./list_present.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListPresentController {
  constructor(private readonly service = new ListPresentService()) {}

  async handle(req: Request, res: Response) {
    const present = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Clientes presentes obtenidos correctamente",
          req.path,
          present
        )
      );
  }
}
