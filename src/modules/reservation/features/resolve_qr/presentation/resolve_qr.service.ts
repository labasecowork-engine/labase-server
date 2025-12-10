import { ResolveQrDTO } from "../domain/resolve_qr.dto";
import { ResolveQrRepository } from "../data/resolve_qr.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { reservation_status } from "@prisma/client";

export class ResolveQrService {
  constructor(private readonly repo = new ResolveQrRepository()) {}

  async execute(dto: ResolveQrDTO) {
    const reservation = await this.repo.findReservationByCode(dto.code);
    if (!reservation) {
      throw new AppError(
        "RESERVATION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const now = new Date();
    let status: "upcoming" | "expired" | "in_progress";

    if (now < reservation.start_time) {
      status = "upcoming";
    } else if (now > reservation.end_time) {
      status = "expired";
    } else {
      status = "in_progress";

      if (reservation.status === reservation_status.confirmed) {
        await this.repo.markAsInProgress(reservation.id);
        reservation.status = reservation_status.in_progress;
      }
    }

    return { reservation, status };
  }
}
