import { attendance_type } from "@prisma/client";

export interface AttendanceRecord {
  employee_id: string;
  type: attendance_type;
  date: Date;
  check_time: Date;
}

export interface AttendanceStats {
  total: number;
  entries: number;
  exits: number;
  uniqueDays: number;
  uniqueEmployees: number;
}

export const getWorkDays = (
  daysBack: number = 30,
  maxWorkDays: number = 20
): Date[] => {
  const workDays: Date[] = [];
  const today = new Date();
  let currentDate = new Date(today);
  currentDate.setDate(currentDate.getDate() - daysBack);

  while (workDays.length < maxWorkDays && currentDate <= today) {
    const dayOfWeek = currentDate.getDay();
    // Solo días laborables (lunes a viernes)
    if (dayOfWeek !== 0 && dayOfWeek !== 6) {
      // 0 = domingo, 6 = sábado
      workDays.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return workDays;
};

export const generateAttendanceStats = (
  records: AttendanceRecord[]
): AttendanceStats => {
  const entryCount = records.filter((r) => r.type === "entry").length;
  const exitCount = records.filter((r) => r.type === "exit").length;
  const uniqueDays = new Set(records.map((r) => r.date.toDateString())).size;
  const uniqueEmployees = new Set(records.map((r) => r.employee_id)).size;

  return {
    total: records.length,
    entries: entryCount,
    exits: exitCount,
    uniqueDays,
    uniqueEmployees,
  };
};

export const printAttendanceStats = (stats: AttendanceStats): void => {
  console.log(`📊 Estadísticas:`);
  console.log(`   - Total registros: ${stats.total}`);
  console.log(`   - Entradas: ${stats.entries}`);
  console.log(`   - Salidas: ${stats.exits}`);
  console.log(`   - Días únicos: ${stats.uniqueDays}`);
  console.log(`   - Empleados con asistencia: ${stats.uniqueEmployees}`);
};
