# CLAUDE.md — Guía operativa de LaBase Server

> Documento canónico para Claude y para cualquier agente que trabaje en este
> repositorio. Describe **cómo está construido el proyecto y cómo se debe
> escribir, organizar y entregar el código**. Si algo de aquí contradice tu
> instinto, gana este documento. Si algo de aquí contradice el código actual,
> gana el código: avísalo y actualiza este archivo.
>
> Complementa (no reemplaza) a `ARCHITECTURE.md` (teoría y diseño) y a
> `CONTRIBUTING.md` (flujo de PRs). Aquí está la versión **práctica y real**.

---

## 1. Qué es LaBase Server

Backend de **LaBase**, un sistema de gestión de espacios de trabajo
(coworking): reservas, administración de usuarios, empleados y asistencia,
productos/inventario, contenido (artículos), newsletter, visitantes,
recordatorios, comunicación en tiempo real y un asistente con IA (Gemini).

Es una **API REST** versionada bajo `/api/v1`, documentada con Swagger en
`/api-docs`.

### Stack real

| Capa | Tecnología |
|------|-----------|
| Runtime | Node.js 18+, **ESM** (`"type": "module"`) |
| Lenguaje | TypeScript 5.9 (strict) |
| HTTP | Express 4 |
| ORM / DB | Prisma 6 + PostgreSQL |
| Validación | Zod |
| Auth | JWT (`jsonwebtoken`) + bcrypt |
| Realtime | Socket.IO |
| Cache | Redis |
| Almacenamiento | AWS S3 (`@aws-sdk`) |
| Email | Nodemailer + EJS (plantillas) |
| IA | `@google/generative-ai` (Gemini) |
| WhatsApp | `whatsapp-web.js` |
| Docs | `swagger-jsdoc` + `swagger-ui-express` |
| Dev / Build | `tsx` (dev), `pkgroll` (build) |

### Scripts (`package.json`)

```bash
npm run dev              # tsx watch src/index.ts  (desarrollo, hot reload)
npm run build            # pkgroll  → dist/
npm start                # node dist/index.js
npm run prisma:generate  # prisma generate
npm run prisma:migrate   # prisma migrate dev
npm run prisma:studio    # prisma studio
npm run seed:dev         # seeds de desarrollo
npm run seed:prod        # seeds de producción
```

No hay framework de tests configurado todavía (`ARCHITECTURE.md` y
`CONTRIBUTING.md` los mencionan como objetivo). **No inventes que existen**: si
agregas tests, agrega también el runner y el script.

---

## 2. Arquitectura: Clean Architecture + Vertical Slices

El código se organiza por **funcionalidad de negocio**, no por capa técnica
global. Cada acción HTTP (un endpoint = un caso de uso) vive en su propia
carpeta autocontenida con sus propias capas internas.

```
src/
├── index.ts            # Bootstrap: Express, CORS, morgan, swagger, socket, redis, 404
├── routes.ts           # Monta cada módulo bajo /api/v1/<recurso>
├── config/             # Configuración global (env, prisma, redis, email, socket)
├── constants/          # http_status_codes/, messages/ (i18n ES)
├── infrastructure/     # Servicios externos (jwt/, aws/)
├── middlewares/        # async_handler/, authenticate_token/
├── utils/              # http_response, error_handler, encryption, user, string, ...
├── shared/             # Código compartido entre módulos
├── docs/               # swagger.ts (config base de OpenAPI)
└── modules/            # 🎯 MÓDULOS DE NEGOCIO (vertical slices)
```

### Anatomía de un módulo

Hay **dos estilos vigentes** en el repo. Para código nuevo usa el **Estilo A
(feature-folder)**, salvo que el módulo que tocas ya use el Estilo B.

#### Estilo A — feature por carpeta (preferido)

```
src/modules/<modulo>/
├── entities/                      # Tipos/entidades de dominio del módulo (opcional)
│   └── <entidad>.entity.ts
├── features/
│   └── <feature>/                 # un caso de uso = un endpoint
│       ├── data/
│       │   └── <feature>.repository.ts     # 💾 acceso a datos (Prisma / APIs)
│       ├── domain/
│       │   ├── <feature>.schema.ts         # 📦 Zod schema (+ tipo inferido)
│       │   └── <feature>.dto.ts            # 📦 z.infer + DTOs de respuesta
│       ├── presentation/
│       │   ├── <feature>.controller.ts     # 🎨 HTTP in/out
│       │   ├── <feature>.service.ts        # 🎨 lógica de aplicación
│       │   └── <feature>.routes.ts         # 🎨 Express Router del feature
│       └── docs/
│           └── index.ts                    # 📝 JSDoc @openapi del endpoint
└── index.ts                        # Router del módulo (combina features)
```

Ejemplo real completo: `src/modules/calendar/features/list_calendar/`.
Otros: `attendance`, `workarea`, `content/category`, `bulk-email`, `inquiry`.

#### Estilo B — capas a nivel de módulo (legacy, aún válido)

Cuando el módulo tiene una sola responsabilidad simple, las capas viven en la
raíz del módulo en vez de por feature:

```
src/modules/bot-web/
├── data/{api,config}/
├── domain/{schema,dtos}/
└── presentation/{controllers,routes,services}/
```

> **Regla:** no mezcles estilos dentro de un mismo módulo. Sigue el que ya
> exista. Para módulos nuevos, Estilo A.

### Las capas y su responsabilidad

| Capa | Carpeta | Responsabilidad | Puede importar de |
|------|---------|-----------------|-------------------|
| **Domain** | `domain/`, `entities/` | Schemas Zod, DTOs, tipos, reglas puras. Sin Express ni Prisma. | nada de infra |
| **Data** | `data/` | Acceso a datos: Prisma, S3, APIs externas. Devuelve datos crudos. | `config/prisma_client`, infra |
| **Presentation** | `presentation/` | HTTP. Controller valida y formatea; Service orquesta reglas; Routes declara el Router. | domain, data, utils, constants |
| **Docs** | `docs/` | Solo comentarios `@openapi` (swagger-jsdoc los recoge). | — |

**La dependencia siempre apunta hacia adentro:** presentation → service →
repository → prisma. El dominio no depende de nadie.

### Flujo de una request

```
HTTP → routes.ts (/api/v1/<recurso>)
     → <modulo>/index.ts (Router del módulo)
     → <feature>.routes.ts  [authenticateToken] [asyncHandler]
     → <feature>.controller.ts   (Schema.parse(req) → DTO)
     → <feature>.service.ts      (reglas de negocio)
     → <feature>.repository.ts   (Prisma / S3 / API)
     → buildHttpResponse(...) → JSON
```

Los errores **no se capturan en cada controller**: `asyncHandler` envuelve el
handler y delega a `handleServerError` (ver §6).

---

## 3. Cómo crear un nuevo feature (receta)

Supón el feature `create_company` en el módulo `company`.

**1. Domain — schema + dto**

```typescript
// features/create_company/domain/create_company.schema.ts
import { z } from "zod";

export const CreateCompanySchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }).min(2),
  ruc: z.string().length(11, "El RUC debe tener 11 dígitos"),
});
export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>;
```

```typescript
// features/create_company/domain/create_company.dto.ts
import { z } from "zod";
import { CreateCompanySchema } from "./create_company.schema";

export type CreateCompanyDTO = z.infer<typeof CreateCompanySchema>;

export interface CreateCompanyResponseDTO {
  id: string;
  name: string;
}
```

**2. Data — repository**

```typescript
// features/create_company/data/create_company.repository.ts
import prisma from "../../../../../config/prisma_client";
import { Prisma } from "@prisma/client";

export class CreateCompanyRepository {
  create(data: Prisma.companiesCreateInput) {
    return prisma.companies.create({ data });
  }

  findByRuc(ruc: string) {
    return prisma.companies.findFirst({ where: { ruc } });
  }
}
```

**3. Presentation — service**

```typescript
// features/create_company/presentation/create_company.service.ts
import { CreateCompanyRepository } from "../data/create_company.repository";
import { CreateCompanyDTO } from "../domain/create_company.schema";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class CreateCompanyService {
  constructor(private readonly repo = new CreateCompanyRepository()) {}

  async execute(dto: CreateCompanyDTO) {
    const exists = await this.repo.findByRuc(dto.ruc);
    if (exists) {
      throw new AppError("La empresa ya existe", HttpStatusCodes.CONFLICT.code);
    }
    return this.repo.create(dto);
  }
}
```

**4. Presentation — controller** (sin try/catch; `asyncHandler` lo maneja)

```typescript
// features/create_company/presentation/create_company.controller.ts
import { Request, Response } from "express";
import { CreateCompanySchema, CreateCompanyDTO } from "../domain/create_company.schema";
import { CreateCompanyService } from "./create_company.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class CreateCompanyController {
  constructor(private readonly svc = new CreateCompanyService()) {}

  async handle(req: Request, res: Response) {
    const dto: CreateCompanyDTO = CreateCompanySchema.parse(req.body);
    const company = await this.svc.execute(dto);

    return res
      .status(HttpStatusCodes.CREATED.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.CREATED.code,
          "Empresa creada correctamente",
          req.path,
          company
        )
      );
  }
}
```

**5. Presentation — routes**

```typescript
// features/create_company/presentation/create_company.routes.ts
import { Router } from "express";
import { asyncHandler } from "../../../../../middlewares/async_handler";
import { authenticateToken } from "../../../../../middlewares/authenticate_token";
import { CreateCompanyController } from "./create_company.controller";

const router = Router();
const controller = new CreateCompanyController();

router.post(
  "/companies",
  authenticateToken,
  asyncHandler((req, res) => controller.handle(req, res))
);

export { router as createCompanyRoutes };
```

**6. Router del módulo**

```typescript
// modules/company/index.ts
import { Router } from "express";
import { createCompanyRoutes } from "./features/create_company/presentation/create_company.routes";

export const companyRouter = Router();
companyRouter.use("/", createCompanyRoutes);
export default companyRouter;
```

**7. Registrar en `src/routes.ts`**

```typescript
import { companyRouter } from "./modules/company";
router.use(`${API_VERSION}/`, companyRouter);
```

**8. Docs** — añade `docs/index.ts` con el bloque `@openapi` (ver §7).

---

## 4. Convenciones de nombres

### Archivos y carpetas

- **Módulos**: `kebab-case` → `bulk-email`, `bot-web`, `content`.
- **Features**: `snake_case` → `create_reservation`, `list_my_attendance`.
- **Archivos**: `<feature>.<rol>.ts` → `create_company.controller.ts`,
  `create_company.service.ts`, `create_company.repository.ts`,
  `create_company.schema.ts`, `create_company.dto.ts`.
  - El sufijo de ruta aparece como `.routes.ts` (mayoría) o `.route.ts`
    (alguno legacy, p. ej. calendar). Usa **`.routes.ts`** en código nuevo.
- **Entidades**: `<entidad>.entity.ts`.
- **Docs**: `docs/index.ts`.

### Identificadores TypeScript

- **Clases**: `PascalCase` con sufijo de rol → `CreateCompanyController`,
  `CreateCompanyService`, `CreateCompanyRepository`.
- **Schemas Zod**: `PascalCase` + `Schema` → `CreateCompanySchema`.
- **DTOs / tipos**: `PascalCase` + `DTO` → `CreateCompanyDTO`,
  `CreateCompanyResponseDTO`.
- **Routers exportados**: `<modulo>Router` o `<feature>Routes`
  (`companyRouter`, `createCompanyRoutes`).
- **Métodos públicos** de service: **`execute(...)`** es la convención para el
  caso de uso principal. Repositorios usan verbos: `create`, `findById`,
  `findMany`, `update`, `delete`, `findByX`.
- **Métodos privados** auxiliares: pueden llevar prefijo `_` (`_expandByDay`) o
  `private` simple. Prefiere `private` + nombre claro.
- **Constantes globales**: `UPPER_SNAKE_CASE` (`DEFAULT_LIMIT`, `API_VERSION`).

### Variables

- En lógica de aplicación: `camelCase`.
- En **datos que mapean a la base de datos**: `snake_case` (porque la DB usa
  snake_case y Prisma expone los campos tal cual): `user_id`, `start_time`,
  `created_at`. No renombres campos de Prisma a camelCase.

### Idioma

- **Código** (nombres de variables, clases, archivos): **inglés**.
- **Mensajes al usuario / comentarios de negocio**: **español** (el producto es
  para usuarios hispanohablantes). Los mensajes de error vivan en
  `constants/messages/` siempre que se reusen.

---

## 5. Base de datos (Prisma + PostgreSQL)

- Schema único: **`prisma/schema.prisma`**. Datasource `postgresql` con
  `url = env("DATABASE_URL")` y `directUrl = env("DIRECT_URL")`.
- **Tablas y columnas en `snake_case`**. Modelos en plural cuando aplica
  (`users`, `companies`, `products`, `reservation`, `space` — el repo es algo
  inconsistente entre singular/plural; respeta el nombre existente del modelo).
- **Enums en `snake_case` con valores en minúscula**:
  `user_type { admin, client, employee }`, `reservation_status`,
  `space_type`, `attendance_type`, etc.
- Timestamps: `created_at` / `updated_at`.
- ~26 modelos. Dominios principales: usuarios/roles (`users`, `admin_details`,
  `user_details`), empresas/empleados (`companies`, `employee_details`,
  `employee_schedules`, `attendance*`), espacios y reservas (`space`,
  `space_image`, `benefit`, `price`, `reservation`, `reservation_slot`),
  contenido (`article_categories`, `articles`), inventario (`products`,
  `product_brand`), y otros (`visitors`, `reminders`, `chat_messages`,
  `newsletter_subscriber`).

### Reglas de DB

1. **Todo acceso a datos pasa por un repository.** Services y controllers no
   importan `prisma` directamente (excepto helpers de `utils/` ya establecidos
   como `getAuthenticatedUser`).
2. Importa el cliente desde `config/prisma_client`:
   ```typescript
   import prisma from "../../../../../config/prisma_client";
   ```
3. Usa los tipos generados de Prisma para inputs:
   `Prisma.companiesCreateInput`, etc.
4. Usa `select` / `include` para traer solo lo necesario (ver
   `list_calendar.repository.ts`).
5. Cambios de modelo → editar `schema.prisma` → `npm run prisma:migrate`
   (dev) y `prisma migrate deploy` en prod → `npm run prisma:generate`.
6. Nunca edites a mano la carpeta generada del cliente.

---

## 6. Manejo de errores (¡importante y específico de este repo!)

**Los controllers NO usan try/catch.** El patrón real es:

1. Las rutas envuelven el handler en `asyncHandler(...)`.
2. `asyncHandler` hace `.catch(error => handleServerError(res, req, error))`.
3. Para errores de negocio, **lanza `AppError`** (de `src/types/`) con un
   `statusCode`; `handleServerError` lo traduce a la respuesta correcta.

```typescript
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

if (!company) {
  throw new AppError("Empresa no encontrada", HttpStatusCodes.NOT_FOUND.code);
}
```

`handleServerError` (en `utils/error_handler/`) ya distingue y formatea:

- `ZodError` → 400 con lista de `issues` (vía `handleZodError`).
- `AppError` → `error.statusCode` + mensaje.
- `Prisma.PrismaClientValidationError` → 400 genérico de validación.
- `Prisma.PrismaClientKnownRequestError` → 400 con `meta`.
- `"ONLY_IMAGE_FILES_ALLOWED"` → 400.
- Cualquier otro → 500 (stack en dev, "Internal Server Error" en prod).

> No reimplementes este manejo por feature. Si necesitas un tipo de error
> nuevo, añádelo a `handleServerError`, no a un catch local.

`ZodError` se puede dejar propagar (el `.parse()` en el controller lanza y
`asyncHandler` lo captura). No envuelvas `.parse()` en try/catch.

---

## 7. Respuestas HTTP y documentación

### Formato de respuesta — `buildHttpResponse`

**Toda** respuesta JSON se construye con `buildHttpResponse` (de
`utils/http_response`):

```typescript
buildHttpResponse(status, description, req.path, data?, meta?)
```

Produce:

```json
{
  "status": 200,
  "message": "OK",
  "description": "Empresa creada correctamente",
  "timestamp": "2026-06-16T...",
  "path": "/api/v1/companies",
  "data": { ... },
  "meta": { ... }   // solo si se pasa
}
```

- `status` y `message` salen de `HttpStatusCodes` (de
  `constants/http_status_codes`). **Usa siempre `HttpStatusCodes.X.code`**, no
  números mágicos.
- `meta` se usa para paginación: combina con `getPaginationParams(query)` y
  `buildPaginationMeta(total, page, limit)` (mismo archivo).

### Mensajes reutilizables — `MESSAGES`

Textos de error/éxito recurrentes viven en `constants/messages/` agrupados por
dominio y se exponen vía el objeto `MESSAGES`
(`MESSAGES.AUTH.REQUEST_REGISTRATION.SUCCESS`). Si un mensaje se usa en más de
un sitio, ponlo ahí (en español).

### Swagger / OpenAPI

Documenta cada endpoint con un bloque JSDoc `@openapi` en
`features/<feature>/docs/index.ts`. `swagger-jsdoc` los recoge y se sirven en
`/api-docs`.

```typescript
/**
 * @openapi
 * /api/v1/companies:
 *   post:
 *     tags: [Company]
 *     summary: Crear empresa
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       201:
 *         description: Empresa creada
 */
```

---

## 8. Autenticación y autorización

- JWT vía el middleware `authenticateToken`
  (`middlewares/authenticate_token`). Espera `Authorization: Bearer <token>`,
  verifica con `JWT_SECRET` y rellena `req.user = { id, email, user_type }`.
- Tipos de usuario: `"admin" | "client" | "employee"`.
- En el controller/service, obtén el usuario completo con
  **`getAuthenticatedUser(req)`** (de `utils/`), que devuelve `CurrentUser`
  (`{ id, role, admin_role? }`) y valida contra la DB. Lanza `AppError` 401/403
  si no es válido.
- Aplica `authenticateToken` en la ruta para endpoints protegidos; usa
  `getAuthenticatedUser` cuando necesites el rol/identidad ya verificada.
- Permisos finos: helpers en `utils/permissions`.

---

## 9. Estilo de código (TypeScript / Node)

- **ESM**: `"type": "module"`. Imports relativos **sin extensión**
  (`from "../data/x.repository"`); el bundler/tsx resuelve. Imports de plugins
  de librerías que lo requieren sí llevan `.js` (p. ej.
  `import utc from "dayjs/plugin/utc.js"`).
- **TypeScript strict**: tipa entradas y salidas públicas. Evita `any`; cuando
  sea inevitable, acótalo (el repo lo usa en `buildHttpResponse`, no lo
  imites sin razón).
- **Clases con inyección por defecto en el constructor** para poder testear:
  `constructor(private readonly svc = new XService()) {}`. Esto permite pasar un
  mock sin framework de DI.
- **Una responsabilidad por archivo**: controller solo HTTP, service solo
  reglas, repository solo datos.
- **Sin lógica de negocio en controllers ni en repositories.** El controller
  parsea/formatea; el repository solo habla con la fuente de datos.
- **No `console.log` en código de producción.** Hay un `console.log` colado en
  `list_calendar.repository.ts` — no es modelo a seguir; usa logging
  intencional o elimínalo.
- Imports de utilidades: prefiere el barrel `utils/` (`from "../../../utils/"`)
  que reexporta `http_response`, `error_handler`, `user`, `string`, etc.
- Fechas: `dayjs` (con plugins `utc`/`timezone`) o `date-fns`/`date-fns-tz`
  según el módulo. Respeta lo que ya use el módulo.
- IDs: `nanoid` / `uuid` según el patrón existente del módulo.
- Async/await siempre; nada de `.then()` encadenado en lógica de negocio.

---

## 10. Git: commits, ramas y PRs

### Commits — Conventional Commits + Gitmoji

```
<tipo>: :<gitmoji>: <descripción en imperativo>
```

Ejemplos (estilo real del repo):

```bash
feat: :sparkles: add create-company endpoint
fix: :bug: corrige cálculo de slots en reservas
refactor: :recycle: remove payment module
chore: :sparkles: update CORS configuration
docs: :memo: document attendance module
```

Tipos: `feat`, `fix`, `hotfix`, `docs`, `chore`, `refactor`, `test`.
Refs: [Conventional Commits](https://www.conventionalcommits.org/) ·
[Gitmoji](https://gitmoji.dev/).

### Ramas

```
<tipo>/<modulo>/<descripcion-kebab>
# ej: feature/auth/login-with-email
```

### Flujo

1. Diseña el endpoint (verbo + path).
2. Crea el feature con sus capas (§3).
3. Documenta con `@openapi`.
4. Abre PR para revisión.
5. Merge a `main`.

> **No commits ni push salvo que el usuario lo pida.** Si trabajas sobre `main`,
> crea rama primero.

### Co-autoría (cuando se te pida commitear)

Cierra los mensajes de commit con:

```
Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>
```

---

## 11. Configuración y entorno

- Variables en `.env` (hay `.env.sample` como referencia). Acceso centralizado
  en `config/env` (exporta `PORT`, `APP_URL`, `JWT_SECRET`, etc.). **No leas
  `process.env` disperso**; añade la variable a `config/env` y consúmela de ahí.
- `docker-compose.yml` disponible para servicios locales (Postgres/Redis).
- CORS: hoy `origin: "*"` (hay un `TODO` en `index.ts` para endurecerlo). Si lo
  tocas, considera restringir orígenes.
- Redis se conecta al arrancar (`index.ts`); fallos de conexión se loguean pero
  no tumban el server.

---

## 12. Checklist antes de dar por terminado un cambio

- [ ] El feature respeta el estilo del módulo (A o B) y la separación de capas.
- [ ] Nombres siguen §4 (archivos, clases, schemas/DTOs, `execute`).
- [ ] Validación de entrada con Zod en `domain/` y `.parse()` en el controller.
- [ ] Acceso a datos solo vía repository; `prisma` no aparece en controller/service.
- [ ] Errores de negocio con `AppError`; sin try/catch local; ruta con `asyncHandler`.
- [ ] Respuesta con `buildHttpResponse` + `HttpStatusCodes.*.code`.
- [ ] Endpoints protegidos con `authenticateToken`; identidad con `getAuthenticatedUser`.
- [ ] Ruta registrada en `modules/<m>/index.ts` y en `src/routes.ts`.
- [ ] Bloque `@openapi` en `docs/`.
- [ ] Mensajes al usuario en español; reutilizables en `constants/messages`.
- [ ] Si cambió el modelo: migración aplicada + `prisma generate`.
- [ ] `npm run dev` levanta sin errores de tipos.
- [ ] Commit estilo Conventional + Gitmoji (solo si el usuario pidió commit).

---

## 13. Skills disponibles en este repo

En `.claude/skills/` hay skills con el detalle profundo de cada área. Invócalas
cuando trabajes en lo suyo:

- **`labase-architecture`** — vertical slices, capas, crear módulos/features.
- **`labase-nodejs`** — Express, middlewares, ESM, async, realtime, config.
- **`labase-typescript`** — tipado strict, DTOs, inferencia Zod, patrones de clase.
- **`labase-prisma`** — modelado, migraciones, queries, repositorios, enums.
- **`labase-clean-code`** — SRP, nombres, funciones pequeñas, errores, sin duplicación.
```
