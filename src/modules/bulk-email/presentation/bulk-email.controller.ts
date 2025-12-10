import { Response } from "express";
import { EmailService } from "./bulk-email.service";
import { BulkEmailSchema } from "../domain/bulk-email.dto";
import {
  handleServerError,
  handleZodError,
} from "../../../utils/error_handler";
import { ZodError } from "zod";
import { HttpStatusCodes } from "../../../constants";
import { buildHttpResponse } from "../../../utils";
import { getAuthenticatedUser } from "../../../utils/";
import { AuthenticatedRequest } from "../../../middlewares/authenticate_token";

export class EmailController {
  constructor(private readonly service = new EmailService()) {}

  async sendBulkEmail(
    req: AuthenticatedRequest,
    res: Response
  ): Promise<Response> {
    try {
      const user = await getAuthenticatedUser(req);

      if (user.role !== "admin") {
        return res
          .status(HttpStatusCodes.FORBIDDEN.code)
          .json(
            buildHttpResponse(
              HttpStatusCodes.FORBIDDEN.code,
              "Only admins can send bulk emails",
              req.path
            )
          );
      }

      const data = BulkEmailSchema.parse(req.body);
      const result = await this.service.sendBulkEmail(data);

      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path)
        );
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  }
}
