import { Request, Response } from "express";
import { GetCategoryService } from "./get_category.service";
import { GetCategoryByIdSchema } from "../domain/get_category.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class GetCategoryController {
  constructor(private readonly service = new GetCategoryService()) {}

  async list(req: Request, res: Response) {
    const categories = await this.service.list();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Categories retrieved successfully",
          req.path,
          categories
        )
      );
  }

  async getById(req: Request, res: Response) {
    const { id } = GetCategoryByIdSchema.parse(req.params);
    const category = await this.service.getById(id);
    if (!category) {
      return res
        .status(HttpStatusCodes.NOT_FOUND.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.NOT_FOUND.code,
            "Category not found",
            req.path
          )
        );
    }
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Category retrieved successfully",
          req.path,
          category
        )
      );
  }
}
