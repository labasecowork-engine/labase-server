import { Response } from "express";
import { DeleteProductService } from "./delete_product.service";
import {
  buildHttpResponse,
  getAuthenticatedUser,
} from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";

export class DeleteProductController {
  constructor(private readonly service = new DeleteProductService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const id = req.params.id;

    const result = await this.service.execute(id, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path)
      );
  }
}
