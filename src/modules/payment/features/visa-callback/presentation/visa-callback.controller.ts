import { Request, Response } from "express";
import { VisaCallbackService } from "./visa-callback.service";
import { VisaCallbackDTO } from "../domain/visa-callback.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class VisaCallbackController {
  constructor(private svc = new VisaCallbackService()) {}

  async handle(req: Request, res: Response) {
    const callbackData = this.extractAndValidateData(req);

    const result = await this.svc.execute(callbackData);

    const redirectUrl = this.buildRedirectUrl(callbackData, result.success);

    return res.redirect(redirectUrl);
  }

  private extractAndValidateData(req: Request): VisaCallbackDTO {
    const purchaseNumber = req.query.purchaseNumber as string;
    const reservationId = req.query.reservationId as string;
    const transactionToken = req.body.transactionToken as string;

    const missingParams: string[] = [];
    if (!purchaseNumber) missingParams.push("purchaseNumber");
    if (!reservationId) missingParams.push("reservationId");
    if (!transactionToken) missingParams.push("transactionToken");

    if (missingParams.length > 0) {
      throw new AppError(
        `MISSING_PARAMETERS: ${missingParams.join(", ")}`,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    return {
      purchaseNumber,
      reservationId,
      transactionToken,
    };
  }

  private buildRedirectUrl(
    callbackData: VisaCallbackDTO,
    success: boolean
  ): string {
    const baseUrl = process.env.FRONTEND_URL || "http://localhost:5173";
    const status = success ? "success" : "failed";

    return `${baseUrl}/client/reservations/${callbackData.reservationId}?purchaseNumber=${callbackData.purchaseNumber}&status=${status}`;
  }
}
