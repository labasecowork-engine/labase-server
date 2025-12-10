// src/modules/attendance/features/attendance/list_all_attendance/presentation/list_all_attendance.service.ts
import { formatInTimeZone } from "date-fns-tz";
import { attendance_type } from "@prisma/client";
import { ListAllAttendanceDTO } from "../domain/list_all_attendance.dto";
import { ListAllAttendanceRepository } from "../data/list_all_attendance.repository";
import { TIMEZONE } from "../../../../../../config/env";

export class ListAllAttendanceService {
  constructor(private readonly repo = new ListAllAttendanceRepository()) {}

  async execute(dto: ListAllAttendanceDTO) {
    const result = await this.repo.findAttendances({
      page: dto.page,
      limit: dto.limit,
      employee_id: dto.employee_id,
      start_date: dto.start_date,
      end_date: dto.end_date,
      type: dto.type as attendance_type | undefined,
      search: dto.search,
      work_area_id: dto.work_area_id,
      company_id: dto.company_id,
    });

    const attendances = result.attendances.map((a) => {
      const onlyDate = a.date.toISOString().slice(0, 10);
      const markTime = a.mark_time.toISOString().slice(11, 19);
      const combinedUtc = new Date(`${onlyDate}T${markTime}Z`);
      const date = formatInTimeZone(combinedUtc, TIMEZONE, "yyyy-MM-dd");
      const time = formatInTimeZone(combinedUtc, TIMEZONE, "HH:mm:ss");

      return {
        id: a.id,
        employee_id: a.employee_id,
        type: a.mark_type as attendance_type,
        date,
        check_time: time,
        employee: {
          employee_id: a.employee.employee_id,
          user: {
            id: a.employee.user.id,
            name: `${a.employee.user.first_name} ${a.employee.user.last_name}`,
            email: a.employee.user.email,
          },
        },
      };
    });

    return {
      attendances,
      pagination: {
        page: dto.page,
        limit: dto.limit,
        total: result.total,
        total_pages: Math.ceil(result.total / dto.limit),
      },
    };
  }
}
