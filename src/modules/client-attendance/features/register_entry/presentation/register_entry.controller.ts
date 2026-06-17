import { Request, Response } from "express";
import { RegisterEntrySchema } from "../domain/register_entry.schema";
import { RegisterEntryService } from "./register_entry.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class RegisterEntryController {
  constructor(private readonly service = new RegisterEntryService()) {}

  async handle(req: Request, res: Response) {
    const dto = RegisterEntrySchema.parse(req.body);
    const record = await this.service.execute(dto);
    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Ingreso registrado correctamente",
          req.path,
          record
        )
      );
  }
}
