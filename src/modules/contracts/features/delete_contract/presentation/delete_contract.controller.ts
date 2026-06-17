import { Request, Response } from "express";
import { DeleteContractParamsSchema } from "../domain/delete_contract.schema";
import { DeleteContractService } from "./delete_contract.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class DeleteContractController {
  constructor(private readonly service = new DeleteContractService()) {}

  async handle(req: Request, res: Response) {
    const { id } = DeleteContractParamsSchema.parse(req.params);
    await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Contrato eliminado correctamente",
          req.path
        )
      );
  }
}
