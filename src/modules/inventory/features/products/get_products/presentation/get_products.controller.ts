import { Response } from "express";
import { buildHttpResponse } from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { GetProductsService } from "./get_products.service";
import {
  GetProductsQuerySchema,
  GetProductParamSchema,
} from "../domain/get_products.schema";
import type { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class GetProductsController {
  constructor(private readonly service = new GetProductsService()) {}

  // GET /products (listado)
  async getAll(req: AuthenticatedRequest, res: Response) {
    const query = GetProductsQuerySchema.parse(req.query);
    const data = await this.service.getAll(query);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Lista de productos",
          req.path,
          data
        )
      );
  }

  // GET /products/:id (detalle)
  async getOne(req: AuthenticatedRequest, res: Response) {
    const { id } = GetProductParamSchema.parse(req.params);
    const data = await this.service.getOne(id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Detalle del producto",
          req.path,
          data
        )
      );
  }
}
