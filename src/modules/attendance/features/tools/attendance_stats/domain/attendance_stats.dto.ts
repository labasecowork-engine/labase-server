// src/modules/attendance/features/tools/attendance_stats/domain/attendance_stats.dto.ts
export interface AttendanceStatsResponseDTO {
  total_registered_days: number;
  total_records: number;
  total_hours: string;
  total_employees: number;
  incidents?: {
    late_count: number;
    early_exit_count: number;
    remote_marks: number;
    onsite_marks: number;
    in_schedule_count: number;
    out_of_schedule_count: number;
  };
  breakdown?: {
    by_employee?: Array<{
      employee_id: string;
      total_hours: string;
      records: number;
      late: number;
      early: number;
      remote: number;
      onsite: number;
      days: number;
    }>;
    by_day?: Array<{
      date: string;
      total_hours: string;
      records: number;
      late: number;
      early: number;
      remote: number;
      onsite: number;
      employees: number;
    }>;
  };
}
