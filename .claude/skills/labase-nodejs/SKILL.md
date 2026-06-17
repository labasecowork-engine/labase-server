---
name: labase-nodejs
description: Patrones de Node.js/Express en LaBase Server. Úsala al crear rutas/controllers, middlewares, manejo de errores HTTP, respuestas JSON, autenticación JWT, ESM, async/await, config de entorno, Socket.IO o Redis.
---

# LaBase — Node.js / Express

Detalle completo en `CLAUDE.md` (§6–9, §11).

## ESM

- `"type": "module"`. Imports relativos **sin extensión** (`from "../x.service"`).
- Plugins que lo requieren sí llevan `.js`: `import utc from "dayjs/plugin/utc.js"`.
- Usa el barrel `utils/` para utilidades: `import { buildHttpResponse, getAuthenticatedUser } from "../../../utils/"`.

## Rutas (Router por feature)

```typescript
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { XController } from "./x.controller";

const router = Router();
const controller = new XController();

router.post("/recurso", authenticateToken, asyncHandler((req, res) => controller.handle(req, res)));

export { router as xRoutes };
```

## Controller (sin try/catch)

```typescript
async handle(req: Request, res: Response) {
  const dto: XDTO = XSchema.parse(req.body);            // lanza ZodError → asyncHandler
  const result = await this.svc.execute(dto);
  return res
    .status(HttpStatusCodes.CREATED.code)
    .json(buildHttpResponse(HttpStatusCodes.CREATED.code, "Mensaje", req.path, result));
}
```

## Manejo de errores (clave en este repo)

- **NO** try/catch en controllers. `asyncHandler` captura y llama a `handleServerError`.
- Lógica de negocio lanza `AppError(mensaje, statusCode)` (de `src/types/`).
- `handleServerError` ya distingue `ZodError`, `AppError`, errores de Prisma,
  `ONLY_IMAGE_FILES_ALLOWED` y genérico 500. No reimplementes esto por feature;
  si necesitas un caso nuevo, añádelo ahí.

## Respuestas HTTP

```typescript
buildHttpResponse(status, description, req.path, data?, meta?)
```

- Siempre `HttpStatusCodes.X.code` (sin números mágicos).
- Paginación: `getPaginationParams(req.query)` → `{ page, limit, skip }`;
  `buildPaginationMeta(total, page, limit)` → pásalo como `meta`.
- Mensajes reutilizables en `constants/messages` (`MESSAGES.MODULO.CLAVE`), en español.

## Autenticación

- `authenticateToken` valida `Authorization: Bearer <token>`, rellena
  `req.user = { id, email, user_type }`.
- `getAuthenticatedUser(req)` → `CurrentUser { id, role, admin_role? }` validado
  contra la DB. Úsalo en service/controller cuando necesites rol/identidad.
- Tipos de usuario: `"admin" | "client" | "employee"`.

## Bootstrap (`src/index.ts`)

Express + `morgan` (formato custom) + CORS + `express.json()` + Swagger en
`/api-docs` + `routes` + 404 con `buildHttpResponse`. Socket.IO vía
`initSocket(server)`; Redis se conecta al arrancar (fallo no tumba el server).

## Config/entorno

- Variables vía `config/env` (exporta `PORT`, `APP_URL`, `JWT_SECRET`, ...).
  **No leas `process.env` disperso**: agrégala a `config/env`.
- `.env.sample` es la plantilla. `docker-compose.yml` para Postgres/Redis local.

## Reglas

- `async/await` siempre; nada de `.then()` encadenado en negocio.
- Sin `console.log` en producción (hay uno colado en `list_calendar.repository.ts`; no es modelo).
- Fechas: `dayjs` (utc/timezone) o `date-fns`/`date-fns-tz` según el módulo.

Skills relacionadas: `labase-architecture`, `labase-typescript`, `labase-clean-code`.
