import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { RESERVATION_MESSAGES } from "../../../../../constants/messages/reservation";
import { DetailReservationRepository } from "../data/detail_reservation.repository";
import { CurrentUser } from "../../../../../utils/";

export class DetailReservationService {
  constructor(private readonly repo = new DetailReservationRepository()) {}

  async execute(user: CurrentUser, reservationId: string) {
    const reservation = await this.repo.findById(reservationId);
    if (!reservation) {
      throw new AppError(
        RESERVATION_MESSAGES.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const isOwner = reservation.user.id === user.id;
    const isAdmin = user.role === "admin";

    if (!isOwner && !isAdmin) {
      throw new AppError(
        RESERVATION_MESSAGES.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    const now = new Date();
    const status =
      now < reservation.start_time
        ? "upcoming"
        : now > reservation.end_time
        ? "expired"
        : "in_progress";

    return { reservation, status };
  }
}
