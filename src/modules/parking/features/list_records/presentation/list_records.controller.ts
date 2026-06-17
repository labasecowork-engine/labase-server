import { Request, Response } from "express";
import { ListRecordsQuerySchema } from "../domain/list_records.schema";
import { ListRecordsService } from "./list_records.service";
import {
  buildHttpResponse,
  buildPaginationMeta,
  getPaginationParams,
} from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListRecordsController {
  constructor(private readonly service = new ListRecordsService()) {}

  async handle(req: Request, res: Response) {
    const query = ListRecordsQuerySchema.parse(req.query);
    const { page, limit, skip } = getPaginationParams(req.query);
    const { records, total } = await this.service.execute(query, {
      page,
      limit,
      skip,
    });

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Registros obtenidos correctamente",
          req.path,
          { records, pagination: buildPaginationMeta(total, page, limit) }
        )
      );
  }
}
