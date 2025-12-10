import prisma from "../../../../../config/prisma_client";
import { reservation_status } from "@prisma/client";

interface ListFilters {
  search?: string;
  space_id?: string;
  date_from?: Date;
  date_to?: Date;
  status?: "pending" | "confirmed" | "cancelled" | "in_progress";
}

export class ListMyReservationsRepository {
  async count(user_id: string, filters: ListFilters = {}) {
    const { search, space_id, date_from, date_to, status } = filters;

    const whereConditions: any = {
      user_id,
    };

    if (status) {
      whereConditions.status = status as reservation_status;
    }

    return await prisma.reservation.count({ where: whereConditions });
  }

  async list(
    user_id: string,
    skip: number,
    take: number,
    filters: ListFilters = {}
  ) {
    const { search, space_id, date_from, date_to, status } = filters;

    // Construir las condiciones de filtrado
    const whereConditions: any = {
      user_id,
    };

    // Filtro por estado específico o todos los estados válidos
    if (status) {
      whereConditions.status = status as reservation_status;
    } else {
      whereConditions.status = {
        in: [
          reservation_status.pending,
          reservation_status.in_progress,
          reservation_status.confirmed,
          reservation_status.cancelled,
        ],
      };
    }

    // Filtro por space_id
    if (space_id) {
      whereConditions.space_id = space_id;
    }

    // Filtro por rango de fechas
    if (date_from || date_to) {
      whereConditions.start_time = {};

      if (date_from) {
        whereConditions.start_time.gte = date_from;
      }

      if (date_to) {
        // Agregar 23:59:59 al final del día para incluir todo el día
        const endOfDay = new Date(date_to);
        endOfDay.setHours(23, 59, 59, 999);
        whereConditions.start_time.lte = endOfDay;
      }
    }

    // Filtro de búsqueda por nombre del espacio
    if (search) {
      whereConditions.space = {
        name: {
          contains: search,
          mode: "insensitive",
        },
      };
    }

    const data = await prisma.reservation.findMany({
      where: whereConditions,
      orderBy: { start_time: "desc" },
      include: {
        space: {
          select: {
            id: true,
            name: true,
            space_images: true,
          },
        },
      },
      skip,
      take,
    });

    return data;
  }
}
