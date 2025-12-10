import { Request, Response } from "express";
import { HttpStatusCodes } from "../../../constants";
import { buildHttpResponse } from "../../../utils";
import { inquirySchema } from "../domain/inquiry.schema";
import { inquiryService } from "./inquiry.service";

export class inquiryController {
  async handle(req: Request, res: Response): Promise<Response> {
    const dto = inquirySchema.parse(req.body);
    await inquiryService(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Message sent successfully",
          req.path,
          null
        )
      );
  }
}
