import { Request, Response } from "express";
import { RenewContractParamsSchema } from "../domain/renew_contract.schema";
import { RenewContractService } from "./renew_contract.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class RenewContractController {
  constructor(private readonly service = new RenewContractService()) {}

  async handle(req: Request, res: Response) {
    const { id } = RenewContractParamsSchema.parse(req.params);
    const contract = await this.service.execute(id);
    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Contrato renovado correctamente",
          req.path,
          contract
        )
      );
  }
}
