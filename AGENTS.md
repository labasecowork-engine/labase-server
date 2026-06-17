# AGENTS.md — LaBase Server

> Guía para agentes de IA (Claude Code, Cursor, Copilot Agents, etc.) que
> trabajan en este repositorio. La referencia **completa y canónica** está en
> [`CLAUDE.md`](./CLAUDE.md) — léela antes de escribir código. Aquí va el
> resumen operativo.

## Qué es

Backend REST de **LaBase** (gestión de espacios de coworking): reservas,
usuarios, empleados/asistencia, inventario, contenido, newsletter, visitantes,
recordatorios, realtime y asistente IA. Node.js (ESM) + TypeScript + Express +
Prisma/PostgreSQL + Zod. API bajo `/api/v1`, docs en `/api-docs`.

## Documentación de referencia

| Archivo | Contenido |
|---------|-----------|
| [`CLAUDE.md`](./CLAUDE.md) | **Guía práctica completa**: capas, naming, errores, DB, commits, checklist. |
| [`ARCHITECTURE.md`](./ARCHITECTURE.md) | Teoría: Clean Architecture + Vertical Slices, principios SOLID. |
| [`CONTRIBUTING.md`](./CONTRIBUTING.md) | Flujo de contribución y PRs. |
| `.claude/skills/` | Skills profundas: arquitectura, node, typescript, prisma, clean-code. |

## Reglas de oro (no negociables)

1. **Vertical slices.** Un endpoint = un caso de uso en su carpeta con capas
   `data/ domain/ presentation/ docs/`. Sigue el estilo del módulo que tocas;
   para módulos nuevos usa feature-folder (Estilo A en `CLAUDE.md`).
2. **Separación de capas.** Controller = HTTP; Service = reglas; Repository =
   datos. `prisma` SOLO en repositories.
3. **Validación con Zod** en `domain/`, `Schema.parse(req.*)` en el controller.
4. **Errores:** sin `try/catch` en controllers. Rutas con `asyncHandler`;
   lógica lanza `AppError(mensaje, statusCode)`; lo formatea `handleServerError`.
5. **Respuestas** siempre con `buildHttpResponse(status, desc, req.path, data?, meta?)`
   y `HttpStatusCodes.X.code` (nada de números mágicos).
6. **Auth:** `authenticateToken` en la ruta; `getAuthenticatedUser(req)` para
   identidad/rol.
7. **Naming:** módulos `kebab-case`, features `snake_case`, archivos
   `<feature>.<rol>.ts`, clases `PascalCase` con sufijo de rol, schemas `XSchema`,
   tipos `XDTO`, método de caso de uso `execute()`.
8. **DB:** tablas/columnas/enums en `snake_case`; campos de Prisma no se
   renombran a camelCase. Cambios de modelo → migración + `prisma generate`.
9. **Idioma:** código en inglés; mensajes al usuario en español (en
   `constants/messages` si se reutilizan).
10. **Commits:** Conventional Commits + Gitmoji (`feat: :sparkles: ...`). No
    commitear/pushear salvo que se pida; si estás en `main`, crea rama.

## Antes de terminar

Repasa el checklist de la §12 de `CLAUDE.md` y verifica que `npm run dev`
levanta sin errores de tipos.
