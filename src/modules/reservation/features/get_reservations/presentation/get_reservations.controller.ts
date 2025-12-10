import { Response } from "express";
import { GetReservationsService } from "./get_reservations.service";
import { GetReservationsSchema } from "../domain/get_reservations.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { RESERVATION_MESSAGES } from "../../../../../constants/messages/reservation";
import { AppError } from "../../../../../types/";

export class GetReservationsController {
  constructor(private readonly svc = new GetReservationsService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req);
    if (user.role !== "admin") {
      throw new AppError(
        RESERVATION_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const dto = GetReservationsSchema.parse(req.query);
    const result = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Listado de reservas",
          req.path,
          result
        )
      );
  }
}
