import { Response } from "express";
import { EditProductService } from "./edit_product.service";
import { EditProductSchema } from "../domain/edit_product.schema";
import {
  getAuthenticatedUser,
  buildHttpResponse,
} from "../../../../../../utils/";
import { HttpStatusCodes } from "../../../../../../constants/http_status_codes";
import { uploadFile } from "../../../../../../infrastructure/aws";
import { AuthenticatedRequest } from "../../../../../../middlewares/authenticate_token";
import { MESSAGES } from "../../../../../../constants/messages";

export class EditProductController {
  constructor(private readonly service = new EditProductService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = EditProductSchema.parse(JSON.parse(req.body.data));
    const user = await getAuthenticatedUser(req);
    const id = req.params.id;
    const files = req.files as Express.Multer.File[] | undefined;

    const newImageUrl = files?.[0]
      ? (await uploadFile(files[0], "public/products/img")).url
      : "";

    const updated = await this.service.execute(id, dto, user, newImageUrl);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          MESSAGES.PRODUCT.UPDATED_SUCCESS,
          req.path,
          updated
        )
      );
  }
}
