import prisma from "../../../../../config/prisma_client";

export class ListAssignmentsRepository {
  // Reservas que tienen un locker asignado, con la empresa del cliente (si es
  // empleado) y si su locker tiene una llave entregada actualmente.
  findReservationsWithLocker() {
    return prisma.reservation.findMany({
      where: { locker_id: { not: null } },
      orderBy: { start_time: "desc" },
      select: {
        id: true,
        start_time: true,
        end_time: true,
        user: {
          select: {
            first_name: true,
            last_name: true,
            employee_details: {
              select: { company: { select: { name: true } } },
            },
          },
        },
        locker: {
          select: {
            number: true,
            deliveries: {
              where: { returned_at: null },
              select: { id: true },
            },
          },
        },
      },
    });
  }
}
