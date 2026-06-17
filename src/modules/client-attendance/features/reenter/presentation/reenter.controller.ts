import { Request, Response } from "express";
import { ReenterParamsSchema } from "../domain/reenter.schema";
import { ReenterService } from "./reenter.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ReenterController {
  constructor(private readonly service = new ReenterService()) {}

  async handle(req: Request, res: Response) {
    const { id } = ReenterParamsSchema.parse(req.params);
    const record = await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Reingreso registrado correctamente",
          req.path,
          record
        )
      );
  }
}
