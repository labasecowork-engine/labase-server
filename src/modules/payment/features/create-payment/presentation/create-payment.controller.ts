import { Request, Response } from "express";
import { CreatePaymentService } from "./create-payment.service";
import { CreatePaymentSchema } from "../domain/create-payment.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { handleServerError } from "../../../../../utils/error_handler";

export class CreatePaymentController {
  private svc = new CreatePaymentService();

  async handle(req: Request, res: Response) {
    try {
      console.log("antes", req.body);
      const dto = CreatePaymentSchema.parse(req.body);
      console.log("después", dto);
      const user = await getAuthenticatedUser(req);

      const result = await this.svc.execute(dto, user.id);

      const payload = buildHttpResponse(
        200,
        "Payment flow initiated",
        req.path,
        result
      );
      return res.status(200).json(payload);
    } catch (err) {
      console.log(err);
      return handleServerError(res, req, err);
    }
  }
}
