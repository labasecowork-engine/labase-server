import {
  ClientSearchResultDTO,
  clockFromDate,
} from "../../../entities/client_attendance.entity";
import { SearchClientsRepository } from "../data/search_clients.repository";

export class SearchClientsService {
  constructor(private readonly repo = new SearchClientsRepository()) {}

  async execute(search?: string): Promise<ClientSearchResultDTO[]> {
    const term = search?.trim() ?? "";
    if (!term) return [];

    const users = await this.repo.search(term, new Date());
    return users.map((user) => {
      const reservationEnd = user.reservations[0]?.end_time ?? null;
      return {
        user_id: user.id,
        name: `${user.first_name} ${user.last_name}`,
        company: user.employee_details?.company?.name ?? null,
        document: user.phone ?? null,
        limit_time: reservationEnd ? clockFromDate(reservationEnd) : null,
        source: "reservation",
      };
    });
  }
}
