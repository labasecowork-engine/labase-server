import { Request, Response } from "express";
import { UpdateCategoryService } from "./update_category.service";
import {
  UpdateCategoryParamsSchema,
  UpdateCategoryBodySchema,
} from "../domain/update_category.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdateCategoryController {
  constructor(private readonly service = new UpdateCategoryService()) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = UpdateCategoryParamsSchema.parse(req.params);
      const body = UpdateCategoryBodySchema.parse(req.body);
      const updated = await this.service.execute(id, body);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Category updated successfully",
            req.path,
            updated
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
