// Tipos de dominio, mappers y helpers compartidos por las features de planes.
// El precio "A medida" se representa con `price = null`. Los conteos por
// categoría (stats) NO se almacenan: se derivan en lectura. Sin dependencias de
// infraestructura más allá de los tipos de Prisma.
import { Prisma } from "@prisma/client";

export type PlanCategoryDTO = "individual" | "team" | "office" | "shared_space";
export type BillingPeriodDTO = "day" | "week" | "month" | "year";
export type PlanLabelColorDTO =
  | "gold"
  | "blue"
  | "green"
  | "purple"
  | "rose"
  | "stone";

export interface PlanSpaceDTO {
  id: string;
  name: string;
}

export interface PlanDTO {
  id: string;
  name: string;
  price: number | null; // null = "A medida"
  category: PlanCategoryDTO;
  billing_period: BillingPeriodDTO;
  target_audience: string | null;
  label_color: PlanLabelColorDTO;
  description: string | null;
  features: string[];
  spaces: PlanSpaceDTO[];
  created_at: string; // ISO
}

export interface PlanStatsDTO {
  total: number;
  individual: number;
  team: number;
  office: number;
  shared_space: number;
}

// Datos normalizados de escritura (compatibles con el DTO del schema de
// create/update). `space_ids` se conecta vía la tabla puente en el repositorio.
export interface PlanWriteInput {
  name: string;
  price: number | null;
  category: PlanCategoryDTO;
  billing_period: BillingPeriodDTO;
  target_audience: string | null;
  label_color: PlanLabelColorDTO;
  description: string | null;
  features: string[];
  space_ids: string[];
}

export type PlanWithSpaces = Prisma.planGetPayload<{
  include: { spaces: { include: { space: true } } };
}>;

// Include reutilizable para traer el plan con sus espacios (id + nombre).
export const planInclude = {
  spaces: { include: { space: true } },
} satisfies Prisma.planInclude;

// Campos escalares del plan listos para Prisma (sin la relación de espacios).
export function toPlanScalarData(input: PlanWriteInput) {
  return {
    name: input.name,
    price: input.price,
    category: input.category,
    billing_period: input.billing_period,
    target_audience: input.target_audience ?? null,
    label_color: input.label_color,
    description: input.description ?? null,
    features: input.features,
  };
}

export function toPlanResponse(raw: PlanWithSpaces): PlanDTO {
  return {
    id: raw.id,
    name: raw.name,
    price: raw.price == null ? null : Number(raw.price),
    category: raw.category,
    billing_period: raw.billing_period,
    target_audience: raw.target_audience,
    label_color: raw.label_color,
    description: raw.description,
    features: raw.features,
    spaces: raw.spaces.map((link) => ({
      id: link.space.id,
      name: link.space.name,
    })),
    created_at: raw.created_at.toISOString(),
  };
}
