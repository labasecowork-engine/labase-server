import { Request, Response } from "express";
import {
  RegisterExitBodySchema,
  RegisterExitParamsSchema,
} from "../domain/register_exit.schema";
import { RegisterExitService } from "./register_exit.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class RegisterExitController {
  constructor(private readonly service = new RegisterExitService()) {}

  async handle(req: Request, res: Response) {
    const { id } = RegisterExitParamsSchema.parse(req.params);
    const { exit_time } = RegisterExitBodySchema.parse(req.body);
    const record = await this.service.execute(id, exit_time);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Salida registrada correctamente",
          req.path,
          record
        )
      );
  }
}
