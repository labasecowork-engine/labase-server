import { Request, Response } from "express";
import {
  UpdateContractBodySchema,
  UpdateContractParamsSchema,
} from "../domain/update_contract.schema";
import { UpdateContractService } from "./update_contract.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class UpdateContractController {
  constructor(private readonly service = new UpdateContractService()) {}

  async handle(req: Request, res: Response) {
    const { id } = UpdateContractParamsSchema.parse(req.params);
    const dto = UpdateContractBodySchema.parse(req.body);
    const contract = await this.service.execute(id, dto);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Contrato actualizado correctamente",
          req.path,
          contract
        )
      );
  }
}
