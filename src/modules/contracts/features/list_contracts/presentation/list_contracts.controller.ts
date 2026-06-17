import { Request, Response } from "express";
import { ListContractsQuerySchema } from "../domain/list_contracts.schema";
import { ListContractsService } from "./list_contracts.service";
import {
  buildHttpResponse,
  buildPaginationMeta,
  getPaginationParams,
} from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListContractsController {
  constructor(private readonly service = new ListContractsService()) {}

  async handle(req: Request, res: Response) {
    const query = ListContractsQuerySchema.parse(req.query);
    const { page, limit, skip } = getPaginationParams(req.query);
    const { contracts, total } = await this.service.execute(query, {
      page,
      limit,
      skip,
    });

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Contratos obtenidos correctamente",
          req.path,
          { contracts, pagination: buildPaginationMeta(total, page, limit) }
        )
      );
  }
}
