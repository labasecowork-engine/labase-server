import { Request, Response } from "express";
import { GetContractParamsSchema } from "../domain/get_contract.schema";
import { GetContractService } from "./get_contract.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class GetContractController {
  constructor(private readonly service = new GetContractService()) {}

  async handle(req: Request, res: Response) {
    const { id } = GetContractParamsSchema.parse(req.params);
    const contract = await this.service.execute(id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Contrato obtenido correctamente",
          req.path,
          contract
        )
      );
  }
}
