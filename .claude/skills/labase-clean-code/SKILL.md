---
name: labase-clean-code
description: Principios de clean code y SOLID aplicados a LaBase Server. Úsala al revisar o refactorizar código, nombrar cosas, dividir responsabilidades, eliminar duplicación, simplificar funciones o decidir dónde poner lógica.
---

# LaBase — Clean Code

Aplicación práctica de Clean Code / SOLID a este repo. Ver `CLAUDE.md` (§9, §12)
y `ARCHITECTURE.md`.

## SOLID en la práctica

- **SRP** — Un archivo, una responsabilidad. Controller = HTTP; Service =
  reglas; Repository = datos. Si un controller hace queries o un repository
  valida negocio, está mal ubicado.
- **OCP** — Features nuevas se añaden creando carpetas/archivos, sin modificar
  los existentes. El router del módulo solo agrega `use(...)`.
- **DIP** — Las clases reciben sus dependencias por constructor con default
  (`constructor(private readonly repo = new XRepository()) {}`), para sustituir
  por mocks en tests.

## Nombres

- Revela intención: `getWeeklyEvents()`, no `getData()`.
- Sin abreviaturas crípticas; sigue el naming de §4 de `CLAUDE.md`.
- Métodos de caso de uso: `execute()`. Métodos de repo: verbo + sujeto
  (`findByRuc`, `createMany`).
- Código en inglés; mensajes al usuario en español (centralizados en
  `constants/messages` si se reutilizan).

## Funciones

- Pequeñas y con un solo nivel de abstracción.
- Pocos parámetros; si crecen, agrupa en un DTO/objeto.
- `async/await`, nunca callbacks ni `.then()` encadenado en negocio.
- Extrae helpers privados con nombre (como `_expandByDay`) en vez de bloques
  gigantes inline.

## No te repitas (DRY)

- Respuestas: siempre `buildHttpResponse` (no armes objetos JSON a mano).
- Status: `HttpStatusCodes.X.code` (sin números mágicos como `200`, `404`).
- Errores: `AppError` + `handleServerError`, no try/catch duplicado por feature.
- Mensajes recurrentes: `MESSAGES.MODULO.CLAVE`.
- Paginación: `getPaginationParams` + `buildPaginationMeta`.

## Manejo de errores limpio

- Falla rápido y explícito: lanza `AppError(mensaje, statusCode)` en cuanto
  detectes una violación de regla.
- No tragues errores con `catch` vacío.
- Deja que `ZodError` y errores de Prisma fluyan hacia `handleServerError`.

## Olores a evitar (presentes o tentadores en el repo)

- `console.log` de depuración en código (hay uno en
  `list_calendar.repository.ts` — elimínalo si lo tocas).
- `any` sin justificar.
- Lógica de negocio en controllers o queries fuera de repositories.
- `process.env` leído disperso (centraliza en `config/env`).
- Copiar el bloque try/catch de error en cada controller (ya está en
  `asyncHandler`).
- Mezclar Estilo A y B dentro de un módulo.

## Antes de cerrar un cambio

Usa el checklist de la §12 de `CLAUDE.md`. Pregúntate: ¿está cada línea en su
capa correcta? ¿podría alguien crear el siguiente feature copiando este como
plantilla sin dudar?

Skills relacionadas: `labase-architecture`, `labase-typescript`, `labase-nodejs`, `labase-prisma`.
