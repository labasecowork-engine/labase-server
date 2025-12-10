import { Request, Response } from "express";
import { GetPaymentResultService } from "./get-payment-result.service";
import {
  getAuthenticatedUser,
  buildHttpResponse,
  handleServerError,
} from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class GetPaymentResultController {
  constructor(private svc = new GetPaymentResultService()) {}

  async findOne(req: Request, res: Response) {
    const { purchaseNumber } = req.params;
    const result = await this.svc.findOne(purchaseNumber);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Payment result retrieved successfully",
          "/payment/result",
          result
        )
      );
  }

  async findAll(req: Request, res: Response) {
    const user = await getAuthenticatedUser(req);
    const results = await this.svc.findAll(user.id);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Payment results retrieved successfully",
          "/payment/result",
          results
        )
      );
  }
}
