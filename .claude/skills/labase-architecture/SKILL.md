---
name: labase-architecture
description: Arquitectura de LaBase Server (Clean Architecture + Vertical Slices). Úsala al crear/modificar módulos, features o endpoints, decidir dónde va el código (capas data/domain/presentation/docs), registrar rutas o estructurar carpetas.
---

# LaBase — Arquitectura (Clean Architecture + Vertical Slices)

Referencia rápida para estructurar código. Detalle completo en `CLAUDE.md` (§2–3)
y `ARCHITECTURE.md`.

## Principio

El código se organiza **por funcionalidad de negocio**, no por capa técnica.
Cada endpoint = un caso de uso autocontenido con sus capas internas. La
dependencia siempre apunta hacia adentro: `presentation → service → repository → prisma`.
El dominio (`domain/`, `entities/`) no depende de infraestructura.

## Estructura de un feature (Estilo A — preferido)

```
src/modules/<modulo>/                 # kebab-case
├── entities/<entidad>.entity.ts      # tipos de dominio (opcional)
├── features/<feature>/               # snake_case, un caso de uso
│   ├── data/<feature>.repository.ts          # 💾 Prisma / S3 / APIs
│   ├── domain/<feature>.schema.ts            # 📦 Zod + tipo inferido
│   ├── domain/<feature>.dto.ts               # 📦 z.infer + Response DTO
│   ├── presentation/<feature>.controller.ts  # 🎨 HTTP in/out
│   ├── presentation/<feature>.service.ts     # 🎨 reglas de negocio
│   ├── presentation/<feature>.routes.ts      # 🎨 Router del feature
│   └── docs/index.ts                         # 📝 @openapi
└── index.ts                          # Router del módulo (combina features)
```

Ejemplo real: `src/modules/calendar/features/list_calendar/`.

**Estilo B (legacy):** capas a nivel de módulo (`data/`, `domain/`,
`presentation/` en la raíz) — ej. `bot-web`. No mezcles estilos dentro de un
módulo; sigue el existente.

## Responsabilidad por capa

| Capa | Hace | NO hace |
|------|------|---------|
| `domain/` | Schemas Zod, DTOs, tipos, reglas puras | Importar Express/Prisma |
| `data/` | Acceso a datos, devuelve crudo | Reglas de negocio |
| `presentation/controller` | Parsear req, formatear res | Lógica de negocio, queries |
| `presentation/service` | Orquestar reglas, validar negocio | Hablar con HTTP o con la DB directo |
| `presentation/routes` | Declarar Router + middlewares | Lógica |
| `docs/` | Solo `@openapi` | — |

## Flujo de request

```
routes.ts (/api/v1/<recurso>) → <modulo>/index.ts → <feature>.routes.ts
  [authenticateToken][asyncHandler] → controller (Schema.parse) → service → repository → buildHttpResponse
```

## Crear un feature (pasos)

1. `domain/<f>.schema.ts` (Zod) + `domain/<f>.dto.ts` (`z.infer` + ResponseDTO).
2. `data/<f>.repository.ts` (clase, métodos `create/findById/findMany/...`).
3. `presentation/<f>.service.ts` (clase, `execute(dto, user?)`, inyección por defecto).
4. `presentation/<f>.controller.ts` (clase, `handle(req,res)`, **sin try/catch**).
5. `presentation/<f>.routes.ts` (`Router` + `authenticateToken` + `asyncHandler`).
6. Combinar en `modules/<m>/index.ts` (`export const <m>Router`).
7. Registrar en `src/routes.ts` bajo `${API_VERSION}/...`.
8. `docs/index.ts` con `@openapi`.

## Checklist de revisión arquitectónica

- [ ] ¿El código está en la capa correcta? (sin lógica en controller/repository)
- [ ] ¿`prisma` solo aparece en `data/`?
- [ ] ¿El service expone `execute()` y recibe sus deps por constructor con default?
- [ ] ¿La ruta está registrada en módulo y en `routes.ts`?
- [ ] ¿Existe el `@openapi`?
- [ ] ¿Respeta el estilo (A/B) del módulo?

Skills relacionadas: `labase-clean-code`, `labase-nodejs`, `labase-prisma`, `labase-typescript`.
