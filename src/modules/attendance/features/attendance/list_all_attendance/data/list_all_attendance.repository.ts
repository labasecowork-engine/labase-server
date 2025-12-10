// src/modules/attendance/features/attendance/list_all_attendance/data/list_all_attendance.repository.ts
import { attendance_type } from "@prisma/client";
import prisma from "../../../../../../config/prisma_client";

function atStartOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function atEndOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}

interface FindAttendancesParams {
  page: number;
  limit: number;
  employee_id?: string;
  start_date?: Date;
  end_date?: Date;
  type?: attendance_type;
  search?: string;
  work_area_id?: string;
  company_id?: string;
}

export class ListAllAttendanceRepository {
  async findAttendances(params: FindAttendancesParams) {
    const {
      page,
      limit,
      employee_id,
      start_date,
      end_date,
      type,
      search,
      work_area_id,
      company_id,
    } = params;

    const skip = (page - 1) * limit;

    const where: any = {
      ...(employee_id && { employee_id }),
      ...(type && { mark_type: type }),
      ...((start_date || end_date) && {
        date: {
          ...(start_date && { gte: atStartOfDay(start_date) }),
          ...(end_date && { lte: atEndOfDay(end_date) }),
        },
      }),
    };

    const employeeFilters: any = {};
    if (work_area_id) employeeFilters.work_area_id = work_area_id;
    if (company_id) employeeFilters.company_id = company_id;

    if (search) {
      employeeFilters.user = {
        OR: [
          { first_name: { contains: search, mode: "insensitive" as const } },
          { last_name: { contains: search, mode: "insensitive" as const } },
          { email: { contains: search, mode: "insensitive" as const } },
        ],
      };
    }
    if (Object.keys(employeeFilters).length > 0) {
      where.employee = employeeFilters;
    }

    const [attendances, total] = await Promise.all([
      prisma.attendance_points.findMany({
        where,
        skip,
        take: limit,
        orderBy: [{ date: "desc" }, { mark_time: "desc" }],
        include: {
          employee: {
            include: {
              user: {
                select: {
                  id: true,
                  first_name: true,
                  last_name: true,
                  email: true,
                },
              },
            },
          },
        },
      }),
      prisma.attendance_points.count({ where }),
    ]);

    return { attendances, total };
  }
}
