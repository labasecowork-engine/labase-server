import { Request, Response } from "express";
import { CreateContractSchema } from "../domain/create_contract.schema";
import { CreateContractService } from "./create_contract.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class CreateContractController {
  constructor(private readonly service = new CreateContractService()) {}

  async handle(req: Request, res: Response) {
    const dto = CreateContractSchema.parse(req.body);
    const contract = await this.service.execute(dto);
    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Contrato creado correctamente",
          req.path,
          contract
        )
      );
  }
}
