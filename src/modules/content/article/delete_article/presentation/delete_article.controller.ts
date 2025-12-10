import { Request, Response } from "express";
import { DeleteArticleService } from "./delete_article.service";
import { DeleteArticleParamsSchema } from "../domain/delete_article.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants";
import { AppError } from "../../../../../types/";

interface AuthReq extends Request {
  user?: { id: string };
}

export class DeleteArticleController {
  constructor(private readonly service = new DeleteArticleService()) {}

  async handle(req: Request, res: Response) {
    try {
      const r = req as AuthReq;
      if (!r.user)
        throw new AppError("Unauthorized", HttpStatusCodes.UNAUTHORIZED.code);

      const { id } = DeleteArticleParamsSchema.parse(req.params);
      const result = await this.service.execute(id, r.user.id);

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
    } catch (err) {
      handleServerError(res, req, err);
    }
  }
}
