import { LockerAssignmentResponseDTO } from "../../../entities/locker.entity";
import { ListAssignmentsRepository } from "../data/list_assignments.repository";

type ReservationWithLocker = Awaited<
  ReturnType<ListAssignmentsRepository["findReservationsWithLocker"]>
>[number];

export class ListAssignmentsService {
  constructor(private readonly repo = new ListAssignmentsRepository()) {}

  async execute(): Promise<LockerAssignmentResponseDTO[]> {
    const reservations = await this.repo.findReservationsWithLocker();
    return reservations.map((reservation) => this.toResponse(reservation));
  }

  private toResponse(
    reservation: ReservationWithLocker
  ): LockerAssignmentResponseDTO {
    const company = reservation.user.employee_details?.company?.name ?? null;
    const hasActiveKey = (reservation.locker?.deliveries.length ?? 0) > 0;

    return {
      id: reservation.id,
      locker_number: reservation.locker?.number ?? null,
      client_name: `${reservation.user.first_name} ${reservation.user.last_name}`,
      company,
      source: "reservation",
      valid_from: reservation.start_time.toISOString(),
      valid_to: reservation.end_time.toISOString(),
      key_status: hasActiveKey ? "delivered" : "pending",
    };
  }
}
