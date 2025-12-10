import { Response } from "express";
import { CreateReservationService } from "./create_reservation.service";
import { CreateReservationSchema } from "../domain/create_reservation.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class CreateReservationController {
  constructor(private readonly service = new CreateReservationService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const dto = CreateReservationSchema.parse(req.body);

    const user = await getAuthenticatedUser(req);

    const result = await this.service.execute(dto, user);

    return res.status(HttpStatusCodes.CREATED.code).json(
      buildHttpResponse(
        HttpStatusCodes.CREATED.code,
        result.message,
        req.path,
        {
          reservation_id: result.reservation_id,
          code_qr: result.code_qr,
          price: result.price,
          status: result.status,
          user,
        }
      )
    );
  }
}
