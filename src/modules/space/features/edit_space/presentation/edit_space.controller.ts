import { Response } from "express";
import { EditSpaceService } from "./edit_space.service";
import { EditSpaceSchema } from "../domain/edit_space.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { uploadFile } from "../../../../../infrastructure/aws";
import { SPACE_MESSAGES } from "../../../../../constants/messages/space";

export class EditSpaceController {
  constructor(private readonly service = new EditSpaceService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = EditSpaceSchema.parse(JSON.parse(req.body.data));
    const files = req.files as Express.Multer.File[] | undefined;

    let newImageUrls: string[] = [];
    if (files?.length) {
      const uploads = await Promise.all(
        files.map((f) => uploadFile(f, "public/space/img"))
      );
      newImageUrls = uploads.map((u) => u.url);
    }

    const imageData = {
      keepImages: dto.keep_images || [],
      newImages: newImageUrls,
    };

    const updated = await this.service.execute(req.params.id, dto, imageData);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          SPACE_MESSAGES.UPDATED_SUCCESS,
          req.path,
          updated
        )
      );
  }
}
