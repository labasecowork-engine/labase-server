import { Request, Response } from "express";
import { UpdateArticleService } from "./update_article.service";
import {
  UpdateArticleParamsSchema,
  UpdateArticleBodySchema,
} from "../domain/update_article.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
  files?: { banner?: Express.Multer.File[]; content?: Express.Multer.File[] };
}

export class UpdateArticleController {
  constructor(private readonly service = new UpdateArticleService()) {}

  async handle(req: Request, res: Response) {
    const r = req as AuthReq;
    if (!r.user)
      throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);

    const { id } = UpdateArticleParamsSchema.parse(req.params);
    const body = UpdateArticleBodySchema.parse(req.body);

    const result = await this.service.execute(id, r.user.id, body, r.files);

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
