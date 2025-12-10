import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import timezone from "dayjs/plugin/timezone.js";
import prisma from "../../../../../config/prisma_client";
dayjs.extend(utc);
dayjs.extend(timezone);

export class ListCalendarRepository {
  /**
   * Obtiene los eventos de la semana actual (lunes–domingo).
   * @param userId Si se pasa, filtra solo las reservas de ese usuario.
   */
  async getWeeklyEvents() {
    const startOfWeek = dayjs().startOf("week").add(1, "day");
    const endOfWeek = dayjs().endOf("week").add(1, "day");

    const reservations = await prisma.reservation.findMany({
      where: {
        start_time: {
          gte: startOfWeek.toDate(),
        },
      },
      include: {
        user: { select: { first_name: true, last_name: true } },
        space: { select: { name: true } },
      },
    });
    console.log(this._expandByDay(reservations));
    return this._expandByDay(reservations);
  }

  /**
   * Obtiene los eventos en un rango arbitrario.
   * @param from Fecha ISO inicial (opcional; por defecto, inicio de mes).
   * @param to   Fecha ISO final   (opcional; por defecto, fin de mes).
   * @param userId Si se pasa, filtra solo las reservas de ese usuario.
   */
  async getEventsBetween(from?: string, to?: string, userId?: string) {
    const start = from ? dayjs(from) : dayjs().startOf("month");
    const end = to ? dayjs(to) : dayjs().endOf("month");

    const reservations = await prisma.reservation.findMany({
      where: {
        ...(userId ? { user_id: userId } : {}),
        AND: [
          {
            start_time: { lte: end.toDate() },
          },
          {
            end_time: { gte: start.toDate() },
          },
        ],
      },
      include: {
        user: { select: { first_name: true, last_name: true } },
        space: { select: { name: true } },
      },
    });

    return this._expandByDay(reservations);
  }

  /**
   * Método privado que desglosa cada reserva en eventos diarios.
   */
  private _expandByDay(
    reservations: Array<{
      id: string;
      start_time: Date;
      end_time: Date;
      user: { first_name: string; last_name: string };
      space: { name: string };
    }>
  ) {
    const events: Array<{
      id: string;
      space: string;
      cliente: string;
      start_time: string;
      end_time: string;
      day: number;
    }> = [];

    for (const r of reservations) {
      const start = dayjs(r.start_time);
      const end = dayjs(r.end_time);

      for (
        let date = start.startOf("day");
        date.isBefore(end, "day") || date.isSame(end, "day");
        date = date.add(1, "day")
      ) {
        const sameStartDay = date.isSame(start, "day");
        const sameEndDay = date.isSame(end, "day");

        events.push({
          id: r.id,
          space: r.space.name,
          cliente: `${r.user.first_name} ${r.user.last_name}`,
          start_time: sameStartDay ? start.format("HH:mm") : "09:00",
          end_time: sameEndDay ? end.format("HH:mm") : "18:00",
          day: date.date(), // day() devuelve 0-6 (domingo-sábado)
        });
      }
    }

    return events;
  }
}
