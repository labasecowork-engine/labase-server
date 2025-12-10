export const VISITOR_MESSAGES = {
  CREATED_SUCCESS: "El visitante se ha creado correctamente",
  UPDATED_SUCCESS: "El visitante se ha actualizado correctamente",
  DELETED_SUCCESS: "El visitante se ha eliminado correctamente",

  NOT_FOUND: "El visitante no existe",
  COMPANY_NOT_FOUND: "La compañia no existe",
  FORBIDDEN: "No tienes permiso para realizar esta acción",

  HOST_NOT_FOUND: "El anfitrión (empleado) no existe",
  SPACE_NOT_FOUND: "El espacio no existe",

  ALREADY_CHECKED_OUT: "El visitante ya tiene registrada una hora de salida",

  LOOKUP_NOT_FOUND: "No se encontró ningún registro con el ID proporcionado",
  LOOKUP_BAD_REQUEST: "El formato del ID no es válido",
} as const;
