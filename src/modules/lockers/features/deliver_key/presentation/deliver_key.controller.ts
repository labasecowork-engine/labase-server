import { Request, Response } from "express";
import { DeliverKeySchema } from "../domain/deliver_key.schema";
import { DeliverKeyService } from "./deliver_key.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeliverKeyController {
  constructor(private readonly service = new DeliverKeyService()) {}

  async handle(req: Request, res: Response) {
    const dto = DeliverKeySchema.parse(req.body);
    const delivery = await this.service.execute(dto);
    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Llave entregada correctamente",
          req.path,
          delivery
        )
      );
  }
}
