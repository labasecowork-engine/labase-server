import { ListRemindersRepository } from "../data/list_reminders.repository";
import { ListRemindersQueryInput } from "../domain/list_reminders.schema";

export class ListRemindersService {
  constructor(private readonly repo = new ListRemindersRepository()) {}

  async execute(query: ListRemindersQueryInput) {
    const { reminders, total } = await this.repo.findAll({
      page: query.page,
      limit: query.limit,
      search: query.search,
      isActive: query.is_active,
    });

    const totalPages = Math.ceil(total / query.limit);

    return {
      message: "Recordatorios obtenidos exitosamente",
      data: {
        reminders,
        pagination: {
          page: query.page,
          total_pages: totalPages,
          total: total,
          limit: query.limit,
        },
      },
    };
  }
}
