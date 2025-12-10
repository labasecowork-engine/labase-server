import { ListMyReservationsRepository } from "../data/list_my_reservations.repository";
import { ListMyReservationsDTO } from "../domain/list_my_reservations.dto";

export class ListMyReservationsService {
  constructor(private readonly repo = new ListMyReservationsRepository()) {}

  async execute(userId: string, filters: ListMyReservationsDTO) {
    const { limit, page, search, space_id, date_from, date_to, status } =
      filters;

    const take = limit;
    const skip = (page - 1) * take;
    const total = await this.repo.count(userId, {
      search,
      space_id,
      date_from: date_from ? new Date(date_from) : undefined,
      date_to: date_to ? new Date(date_to) : undefined,
      status,
    });

    const data = await this.repo.list(userId, skip, take, {
      search,
      space_id,
      date_from: date_from ? new Date(date_from) : undefined,
      date_to: date_to ? new Date(date_to) : undefined,
      status,
    });

    return {
      reservations: data,
      pagination: {
        page,
        limit,
        total: total,
        total_pages: Math.ceil(total / limit),
      },
    };
  }
}
