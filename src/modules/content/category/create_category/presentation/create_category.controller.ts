import { Request, Response } from "express";
import { CreateCategoryService } from "./create_category.service";
import { CreateCategorySchema } from "../domain/create_category.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";

export class CreateCategoryController {
  constructor(private readonly service = new CreateCategoryService()) {}

  async handle(req: Request, res: Response) {
    try {
      const parsed = CreateCategorySchema.parse(req.body); // Zod solo aquí
      const created = await this.service.execute(parsed);
      return res
        .status(HttpStatusCodes.CREATED.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.CREATED.code,
            "Category created successfully",
            req.path,
            created
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
