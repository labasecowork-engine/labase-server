import { Response } from "express";
import { buildHttpResponse } from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants";
import { GetBrandService } from "./get_brand.service";
import { GetBrandQuerySchema } from "../domain/get_brand.schema";
import type { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class GetBrandController {
  constructor(private readonly service = new GetBrandService()) {}

  // GET /product-brands/:id
  async getOne(req: AuthenticatedRequest, res: Response) {
    const id = req.params.id;
    const data = await this.service.getOne(id);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Brand detail",
          req.path,
          data
        )
      );
  }

  // GET /product-brands
  async getAll(req: AuthenticatedRequest, res: Response) {
    const query = GetBrandQuerySchema.parse(req.query);
    const data = await this.service.getAll(query);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, "Brand list", req.path, data)
      );
  }
}
