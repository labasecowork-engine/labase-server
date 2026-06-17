import {
  AttendanceStatsDTO,
  localDateString,
} from "../../../entities/client_attendance.entity";
import { GetStatsRepository } from "../data/get_stats.repository";

export class GetStatsService {
  constructor(private readonly repo = new GetStatsRepository()) {}

  async execute(): Promise<AttendanceStatsDTO> {
    const now = new Date();
    const todayStart = new Date(localDateString(now));
    const [present_now, entries_today, over_limit, total] =
      await this.repo.counts(now, todayStart);
    return { present_now, entries_today, over_limit, total };
  }
}
