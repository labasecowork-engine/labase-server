import prisma from "../../../../../config/prisma_client";
import { reservation_status } from "@prisma/client";

export class CancelReservationRepository {
  findById(id: string) {
    return prisma.reservation.findUnique({ where: { id } });
  }

  updateStatus(id: string, status: reservation_status) {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
