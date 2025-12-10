import { Request, Response } from "express";
import { DeleteCategoryService } from "./delete_category.service";
import { DeleteCategoryParamsSchema } from "../domain/delete_category.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteCategoryController {
  constructor(private readonly service = new DeleteCategoryService()) {}

  async handle(req: Request, res: Response) {
    const { id } = DeleteCategoryParamsSchema.parse(req.params);
    const result = await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          result.message,
          req.path,
          result
        )
      );
  }
}
