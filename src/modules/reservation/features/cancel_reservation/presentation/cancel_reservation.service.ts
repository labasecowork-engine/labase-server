import { CancelReservationRepository } from "../data/cancel_reservation.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import type { CurrentUser } from "../../../../../utils/";
import { reservation_status } from "@prisma/client";
import { MESSAGES } from "../../../../../constants/messages";

export class CancelReservationService {
  constructor(private readonly repo = new CancelReservationRepository()) {}

  async execute(id: string, user: CurrentUser) {
    const rsv = await this.repo.findById(id);
    if (!rsv) {
      throw new AppError(
        MESSAGES.RESERVATION.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const isAdmin = user.role === "admin";
    const isOwner = rsv.user_id === user.id;

    if (!isAdmin && !isOwner) {
      throw new AppError(
        MESSAGES.RESERVATION.FORBIDDEN,
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    if (rsv.status === reservation_status.cancelled) {
      throw new AppError(
        MESSAGES.RESERVATION.ALREADY_CANCELLED,
        HttpStatusCodes.CONFLICT.code
      );
    }
    if (rsv.status === reservation_status.in_progress) {
      throw new AppError(
        MESSAGES.RESERVATION.IN_PROGRESS_CANNOT_CANCEL,
        HttpStatusCodes.CONFLICT.code
      );
    }

    const allowed: reservation_status[] = [
      reservation_status.pending,
      reservation_status.confirmed,
    ];
    if (!allowed.includes(rsv.status)) {
      throw new AppError(
        MESSAGES.RESERVATION.STATUS_INVALID_FOR_CANCEL,
        HttpStatusCodes.CONFLICT.code
      );
    }

    const updated = await this.repo.updateStatus(
      id,
      reservation_status.cancelled
    );

    return {
      message: MESSAGES.RESERVATION.CANCELLED_SUCCESS,
      reservation_id: updated.id,
      previous_status: rsv.status,
      status: updated.status,
    };
  }
}
