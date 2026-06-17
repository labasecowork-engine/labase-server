import { Request, Response } from "express";
import { ReturnKeySchema } from "../domain/return_key.schema";
import { ReturnKeyService } from "./return_key.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ReturnKeyController {
  constructor(private readonly service = new ReturnKeyService()) {}

  async handle(req: Request, res: Response) {
    const { id } = ReturnKeySchema.parse(req.params);
    await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Llave devuelta correctamente",
          req.path
        )
      );
  }
}
