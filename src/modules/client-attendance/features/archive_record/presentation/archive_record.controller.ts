import { Request, Response } from "express";
import { ArchiveRecordParamsSchema } from "../domain/archive_record.schema";
import { ArchiveRecordService } from "./archive_record.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ArchiveRecordController {
  constructor(private readonly service = new ArchiveRecordService()) {}

  async handle(req: Request, res: Response) {
    const { id } = ArchiveRecordParamsSchema.parse(req.params);
    await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Registro archivado correctamente",
          req.path
        )
      );
  }
}
