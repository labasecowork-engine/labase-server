import { Request, Response } from "express";
import {
  UpdateRecordBodySchema,
  UpdateRecordParamsSchema,
} from "../domain/update_record.schema";
import { UpdateRecordService } from "./update_record.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdateRecordController {
  constructor(private readonly service = new UpdateRecordService()) {}

  async handle(req: Request, res: Response) {
    const { id } = UpdateRecordParamsSchema.parse(req.params);
    const dto = UpdateRecordBodySchema.parse(req.body);
    const record = await this.service.execute(id, dto);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Registro actualizado correctamente",
          req.path,
          record
        )
      );
  }
}
