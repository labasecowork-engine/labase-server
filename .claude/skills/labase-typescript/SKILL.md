---
name: labase-typescript
description: Convenciones de TypeScript en LaBase Server. Úsala al tipar DTOs, schemas Zod, clases (controller/service/repository), inferencia de tipos, naming de identificadores, o al decidir tipos de entrada/salida.
---

# LaBase — TypeScript

Detalle completo en `CLAUDE.md` (§4, §9).

## Principios

- TypeScript **strict**. Tipa entradas/salidas públicas. Evita `any`; si es
  inevitable, acótalo (no copies el `any` de `buildHttpResponse` sin razón).
- La **fuente de verdad de los tipos de entrada es Zod**: define el schema y
  deriva el DTO con `z.infer`. No dupliques la forma a mano.

## Schema + DTO

```typescript
// domain/x.schema.ts
import { z } from "zod";

export const XSchema = z.object({
  name: z.string({ required_error: "El nombre es requerido" }).min(2),
  email: z.string().email("Correo inválido"),
  page: z.number().min(1).default(1).optional(),
});
export type XDTO = z.infer<typeof XSchema>;
```

```typescript
// domain/x.dto.ts
import { z } from "zod";
import { XSchema } from "./x.schema";

export type XDTO = z.infer<typeof XSchema>;

export interface XResponseDTO {
  id: string;
  name: string;
}
```

## Naming de identificadores

| Elemento | Convención | Ejemplo |
|----------|------------|---------|
| Clases | `PascalCase` + sufijo rol | `CreateCompanyController/Service/Repository` |
| Schema Zod | `PascalCase` + `Schema` | `CreateCompanySchema` |
| Tipos/DTO | `PascalCase` + `DTO` | `CreateCompanyDTO`, `CreateCompanyResponseDTO` |
| Router exportado | `<modulo>Router` / `<feature>Routes` | `companyRouter`, `createCompanyRoutes` |
| Método caso de uso | `execute()` | `service.execute(dto, user?)` |
| Métodos repo | verbos | `create`, `findById`, `findMany`, `findByRuc` |
| Constantes globales | `UPPER_SNAKE_CASE` | `DEFAULT_LIMIT`, `API_VERSION` |
| Variables (lógica) | `camelCase` | `weeklyEvents` |
| Variables (campos DB) | `snake_case` | `user_id`, `start_time` (no renombrar Prisma) |

## Patrón de clase con inyección por defecto

Permite testear pasando un mock, sin framework de DI:

```typescript
export class XService {
  constructor(private readonly repo = new XRepository()) {}
  async execute(dto: XDTO): Promise<XResponseDTO> { /* ... */ }
}
```

## Tipos de Prisma

Usa los generados para inputs de datos: `Prisma.companiesCreateInput`,
`Prisma.<modelo>UpdateInput`, etc. No redefinas tipos que Prisma ya genera.

## Otros

- Importa tipos de Express: `import { Request, Response } from "express"`.
- Para requests autenticadas usa `AuthenticatedRequest` (de
  `middlewares/authenticate_token`) o `getAuthenticatedUser`.
- `CurrentUser = { id, role: "admin"|"client"|"employee", admin_role? }`.
- Idioma: identificadores en inglés; mensajes/strings al usuario en español.

Skills relacionadas: `labase-architecture`, `labase-prisma`, `labase-clean-code`.
