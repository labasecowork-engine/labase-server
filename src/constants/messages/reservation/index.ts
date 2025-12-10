// src/constants/messages/reservation/index.ts
export const RESERVATION_MESSAGES = {
  USER_NOT_FOUND: "El usuario no existe",
  CREATED_SUCCESS: "La reserva se ha creado correctamente",

  SPACE_NOT_FOUND: "El espacio no existe o está inactivo",
  CAPACITY_OUT_OF_RANGE: "El número de personas está fuera de rango",
  FULL_ROOM_FORBIDDEN:
    "No se permite la reserva de sala completa para este espacio",
  UNIT_BOOKING_FORBIDDEN: "No se permite la reserva por unidad en este espacio",

  TIME_OVERLAP: "Ya existe una reserva en ese intervalo de tiempo",
  NO_CAPACITY_LEFT:
    "No hay capacidad disponible para el intervalo de tiempo seleccionado",
  PRICE_NOT_DEFINED:
    "No se ha definido un precio para la duración seleccionada",

  NOT_FOUND: "La reserva no existe",
  FORBIDDEN: "No tienes permiso para ver esta reserva",

  ALREADY_CANCELLED: "La reserva ya está cancelada",
  IN_PROGRESS_CANNOT_CANCEL:
    "No se puede cancelar una reserva que está en curso",
  STATUS_INVALID_FOR_CANCEL:
    "El estado de la reserva no es válido para su cancelación",

  CANCELLED_SUCCESS: "La reserva se ha cancelado correctamente",
} as const;
