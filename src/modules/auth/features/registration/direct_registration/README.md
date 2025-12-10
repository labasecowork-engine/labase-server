# Registro Directo de Usuario

Este módulo permite crear usuarios de tipo "cliente" directamente sin necesidad de verificación por correo electrónico o códigos de verificación.

## Endpoint

```
POST /api/v1/auth/register/direct-registration
```

## Cuerpo de la Petición

```json
{
  "first_name": "Juan",
  "last_name": "Pérez",
  "email": "juan.perez@example.com",
  "password": "miPassword123",
  "confirm_password": "miPassword123"
}
```

## Respuesta exitosa (201)

```json
{
  "success": true,
  "message": "Usuario creado exitosamente",
  "data": {
    "id": 123,
    "first_name": "Juan",
    "last_name": "Pérez",
    "email": "juan.perez@example.com",
    "user_type": "client"
  }
}
```

## Características

- ✅ Crea usuarios inmediatamente sin verificación
- ✅ Encripta automáticamente las contraseñas
- ✅ Verifica que las contraseñas coincidan
- ✅ Valida que el email no esté en uso
- ✅ Crea automáticamente el registro en `user_details`
- ✅ Asigna el tipo de usuario como "client"
- ✅ Establece el estado como "active"

## Validaciones

- Nombre: mínimo 2 caracteres
- Apellido: mínimo 2 caracteres
- Email: formato válido
- Contraseña: mínimo 8 caracteres
- Confirmación de contraseña: debe coincidir con la contraseña

## Errores Posibles

- **400**: Email ya está en uso
- **400**: Datos de validación incorrectos
- **500**: Error interno del servidor
