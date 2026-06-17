import { Request, Response } from "express";
import { SearchClientsSchema } from "../domain/search_clients.schema";
import { SearchClientsService } from "./search_clients.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class SearchClientsController {
  constructor(private readonly service = new SearchClientsService()) {}

  async handle(req: Request, res: Response) {
    const { search } = SearchClientsSchema.parse(req.query);
    const clients = await this.service.execute(search);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Clientes encontrados",
          req.path,
          clients
        )
      );
  }
}
