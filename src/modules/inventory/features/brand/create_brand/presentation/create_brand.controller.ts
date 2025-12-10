import { Response } from "express";
import { CreateBrandService } from "./create_brand.service";
import { CreateBrandSchema } from "../domain/create_brand.schema";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class CreateBrandController {
  constructor(private readonly service = new CreateBrandService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateBrandSchema.parse(req.body);
    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          id: result.brand_id,
          name: dto.name,
        }
      )
    );
  }
}
