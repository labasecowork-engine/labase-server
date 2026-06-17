import { Request, Response } from "express";
import {
  PayContractBodySchema,
  PayContractParamsSchema,
} from "../domain/pay_contract.schema";
import { PayContractService } from "./pay_contract.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class PayContractController {
  constructor(private readonly service = new PayContractService()) {}

  async handle(req: Request, res: Response) {
    const { id } = PayContractParamsSchema.parse(req.params);
    const dto = PayContractBodySchema.parse(req.body);
    const contract = await this.service.execute(id, dto);
    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Pago registrado correctamente",
          req.path,
          contract
        )
      );
  }
}
