import { Request, Response } from "express";
import { CheckAvailabilityService } from "./check_availability.service";
import { CheckAvailabilitySchema } from "../domain/check_availability.schema";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class CheckAvailabilityController {
  constructor(private readonly service = new CheckAvailabilityService()) {}

  async handle(req: Request, res: Response) {
    const dto = CheckAvailabilitySchema.parse(req.body);
    const result = await this.service.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Availability checked",
          req.path,
          result
        )
      );
  }
}
