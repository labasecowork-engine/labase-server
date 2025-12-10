import { Response } from "express";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { DetailReservationService } from "./detail_reservation.service";

export class DetailReservationController {
  constructor(private readonly service = new DetailReservationService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    const reservationId = String(req.params.id);

    const data = await this.service.execute(user, reservationId);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Reservation detail",
          req.path,
          data
        )
      );
  }
}
