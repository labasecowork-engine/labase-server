import { Request, Response } from "express";
import { HttpStatusCodes } from "../../../../../../constants";
import { buildHttpResponse } from "../../../../../../utils";
import { DirectRegistrationSchema } from "../domain/direct_registration.schema";
import { DirectRegistrationService } from "./direct_registration.service";

export class DirectRegistrationController {
  constructor(private readonly service: DirectRegistrationService) {}

  async directRegistration(req: Request, res: Response): Promise<Response> {
    const data = DirectRegistrationSchema.parse(req.body);
    const result = await this.service.directRegistration(data);

    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          result.message,
          req.path,
          result
        )
      );
  }
}
