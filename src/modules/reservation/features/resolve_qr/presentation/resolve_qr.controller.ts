import { Request, Response } from "express";
import { ResolveQrService } from "./resolve_qr.service";
import { ResolveQrSchema } from "../domain/resolve_qr.schema";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";

export class ResolveQrController {
  constructor(private readonly service = new ResolveQrService()) {}

  async handle(req: Request, res: Response) {
    try {
      const dto = ResolveQrSchema.parse(req.body);
      const result = await this.service.execute(dto);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Reserva encontrada",
            req.path,
            result
          )
        );
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  }
}
