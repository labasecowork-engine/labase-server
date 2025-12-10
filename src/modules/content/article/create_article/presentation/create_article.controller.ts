//src/modules/content/article/create_article/presentation/create_article.controller.ts
import { Request, Response } from "express";
import { CreateArticleService } from "./create_article.service";
import { CreateArticleSchema } from "../domain/dtos/create_article.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
  files?: { banner?: Express.Multer.File[]; content?: Express.Multer.File[] };
}

export class CreateArticleController {
  constructor(private readonly service = new CreateArticleService()) {}

  async handle(req: Request, res: Response) {
    try {
      const r = req as AuthReq;
      if (!r.user)
        throw new AppError("Acceso denegado", HttpStatusCodes.UNAUTHORIZED.code);

      const banner = r.files?.banner?.[0];
      const content = r.files?.content?.[0];
      if (!banner || !content) {
        throw new AppError(
          "El banner y el contenido son requeridos, por favor complete los campos.",
          HttpStatusCodes.BAD_REQUEST.code
        );
      }
      console.log(req.body);
      const dto = CreateArticleSchema.parse(req.body);
      const result = await this.service.execute(
        r.user.id,
        dto,
        content,
        banner
      );

      return res
        .status(HttpStatusCodes.CREATED.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.CREATED.code,
            result.message,
            req.path,
            result
          )
        );
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
