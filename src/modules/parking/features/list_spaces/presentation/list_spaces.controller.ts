import { Request, Response } from "express";
import { ListSpacesService } from "./list_spaces.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListSpacesController {
  constructor(private readonly service = new ListSpacesService()) {}

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
