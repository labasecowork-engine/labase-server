export const AUTH_MESSAGES = {
  REQUEST_REGISTRATION: {
    ERROR_REQUIRED_NAME: "El nombre es obligatorio",
    ERROR_INVALID_NAME_MIN_LENGTH: "El nombre debe tener al menos 2 caracteres",

    ERROR_REQUIRED_LAST_NAME: "El apellido es obligatorio",
    ERROR_INVALID_LAST_NAME_MIN_LENGTH:
      "El apellido debe tener al menos 2 caracteres",

    ERROR_REQUIRED_EMAIL: "El correo electrónico es obligatorio",
    ERROR_INVALID_EMAIL:
      "El formato del correo electrónico no es válido, revisa que esté escrito correctamente",

    ERROR_REQUIRED_PASSWORD: "La contraseña es obligatoria",
    ERROR_REQUIRED_PASSWORD_MIN_LENGTH:
      "La contraseña debe tener al menos 8 caracteres",

    ERROR_REQUIRED_CONFIRM_PASSWORD:
      "La confirmación de contraseña es obligatoria",
    ERROR_REQUIRED_CONFIRM_PASSWORD_MIN_LENGTH:
      "La confirmación de contraseña debe tener al menos 6 caracteres",

    ERROR_PASSWORD_NOT_MATCH:
      "Las contraseñas no coinciden, vuelve a intentar por favor",

    ERROR_ALREADY_REGISTER: "El usuario ya se encuentra registrado",
    ERROR_INTERNAL_SERVER_ERROR:
      "Ocurrió un error interno en el servidor, por favor intenta nuevamente",
    SUCCESS: "El registro se ha completado exitosamente",
  },
};
