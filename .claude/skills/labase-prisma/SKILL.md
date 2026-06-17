---
name: labase-prisma
description: Prisma + PostgreSQL en LaBase Server. Úsala al modelar/editar schema.prisma, crear migraciones, escribir queries en repositorios, usar enums, includes/selects, o trabajar con tipos generados de Prisma.
---

# LaBase — Prisma / PostgreSQL

Detalle completo en `CLAUDE.md` (§5).

## Setup

- Schema único: `prisma/schema.prisma`. Provider `postgresql`,
  `url = env("DATABASE_URL")`, `directUrl = env("DIRECT_URL")`.
- Cliente: `import prisma from "../../config/prisma_client"` (ruta relativa según
  profundidad del archivo).

## Convenciones de modelado

- Tablas y **columnas en `snake_case`**.
- Modelos: respeta el nombre existente (el repo mezcla plural/singular: `users`,
  `companies`, `products`, pero `reservation`, `space`). No lo "corrijas".
- **Enums en `snake_case`, valores en minúscula**:
  ```prisma
  enum reservation_status { pending confirmed cancelled in_progress }
  enum user_type { admin client employee }
  ```
- Timestamps: `created_at` / `updated_at`.
- ~26 modelos. Dominios: usuarios/roles (`users`, `admin_details`,
  `user_details`), empresas/empleados/asistencia (`companies`,
  `employee_details`, `employee_schedules`, `attendance*`,
  `attendance_policy_templates`, `attendance_points`), espacios/reservas
  (`space`, `space_image`, `benefit`, `space_benefit`, `price`, `reservation`,
  `reservation_slot`), contenido (`article_categories`, `articles`), inventario
  (`products`, `product_brand`), y otros (`visitors`, `reminders`,
  `chat_messages`, `newsletter_subscriber`).

## Reglas de acceso a datos

1. **Todo acceso a DB va en un repository** (`data/<feature>.repository.ts`).
   Controllers y services NO importan `prisma` (excepto helpers ya establecidos
   en `utils/`, p. ej. `getAuthenticatedUser`).
2. Repository = clase con métodos por operación:
   ```typescript
   export class XRepository {
     create(data: Prisma.companiesCreateInput) { return prisma.companies.create({ data }); }
     findById(id: string) { return prisma.companies.findUnique({ where: { id } }); }
     findMany() { return prisma.companies.findMany({ orderBy: { created_at: "desc" } }); }
   }
   ```
3. Usa tipos generados para inputs: `Prisma.<modelo>CreateInput` / `UpdateInput`.
4. Trae solo lo necesario con `select` / `include`:
   ```typescript
   include: { user: { select: { first_name: true, last_name: true } }, space: { select: { name: true } } }
   ```
5. `findUniqueOrThrow` cuando la ausencia es un error (como en `getAuthenticatedUser`).
6. Para errores de Prisma no hace falta capturarlos: `handleServerError` ya
   maneja `PrismaClientValidationError` y `PrismaClientKnownRequestError`.

## Migraciones

```bash
# editar prisma/schema.prisma, luego:
npm run prisma:migrate     # prisma migrate dev   (desarrollo)
npm run prisma:generate    # regenerar cliente
npm run prisma:studio      # explorar datos
# producción:
prisma migrate deploy
```

- Nunca edites a mano el cliente generado.
- Tras cambiar el schema, **regenera** y actualiza los repositorios afectados.
- Seeds: `npm run seed:dev` / `npm run seed:prod` (`src/modules/seed`).

Skills relacionadas: `labase-architecture`, `labase-typescript`, `labase-clean-code`.
