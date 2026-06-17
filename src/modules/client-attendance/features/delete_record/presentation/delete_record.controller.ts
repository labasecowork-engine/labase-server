import { Request, Response } from "express";
import { DeleteRecordParamsSchema } from "../domain/delete_record.schema";
import { DeleteRecordService } from "./delete_record.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteRecordController {
  constructor(private readonly service = new DeleteRecordService()) {}

  async handle(req: Request, res: Response) {
    const { id } = DeleteRecordParamsSchema.parse(req.params);
    await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Registro eliminado correctamente",
          req.path
        )
      );
  }
}
