//src/utils/permissions/index.ts
import { CurrentUser } from "../authenticated_user";

export const isAdmin = (u: CurrentUser) => u.role === "admin";
export const isEmployee = (u: CurrentUser) => u.role === "employee";

// permiso para que el empleado solo marque su propia asistencia
export const canMarkForEmployee = (u: CurrentUser, employee_id: string) =>
  isEmployee(u) && u.id === employee_id;

export const canSeeGlobal = (u: CurrentUser) => isAdmin(u);
export const canCorrectPoint = (u: CurrentUser) => isAdmin(u);
