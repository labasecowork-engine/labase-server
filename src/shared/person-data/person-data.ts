import { DECOLECTA_API_KEY, DECOLECTA_BASE_URL } from "../../config/env";
import { AppError } from "../../types/";
import { HttpStatusCodes } from "../../constants/http_status_codes";
import { z } from "zod";

const ReniecResponseSchema = z.object({
  first_name: z.string(),
  first_last_name: z.string(),
  second_last_name: z.string(),
  full_name: z.string(),
  document_number: z.string(),
});

type ReniecResponse = z.infer<typeof ReniecResponseSchema>;

const SunatRucResponseSchema = z
  .object({
    ruc: z.string().optional(),
    razonSocial: z.string().optional(),
  })
  .passthrough();

type SunatRucResponse = z.infer<typeof SunatRucResponseSchema>;

export class DecolectaClient {
  private base = (DECOLECTA_BASE_URL ?? "https://api.decolecta.com").replace(
    /\/+$/,
    ""
  );

  private headers() {
    if (!DECOLECTA_API_KEY) {
      throw new AppError(
        "DECOLECTA_API_KEY not configured",
        HttpStatusCodes.INTERNAL_SERVER_ERROR.code
      );
    }
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${DECOLECTA_API_KEY}`,
    };
  }

  async lookupByDni(dni: string) {
    const url = `${this.base}/v1/reniec/dni?numero=${encodeURIComponent(dni)}`;
    const res = await fetch(url, { headers: this.headers() });

    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new AppError(
        `DeColecta RENIEC error: ${res.status} ${res.statusText}${
          text ? ` – ${text}` : ""
        }`,
        HttpStatusCodes.BAD_GATEWAY.code
      );
    }

    const json = (await res.json()) as unknown;
    return ReniecResponseSchema.parse(json);
  }

  async lookupByRuc(ruc: string) {
    const url = `${this.base}/v1/sunat/ruc?numero=${encodeURIComponent(ruc)}`;
    const res = await fetch(url, { headers: this.headers() });

    if (res.status === 404) return null;
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new AppError(
        `DeColecta SUNAT error: ${res.status} ${res.statusText}${
          text ? ` – ${text}` : ""
        }`,
        HttpStatusCodes.BAD_GATEWAY.code
      );
    }

    const json = (await res.json()) as unknown;
    return SunatRucResponseSchema.parse(json);
  }
}

export function normalizeReniecToVisitor(dto: ReniecResponse) {
  const firstName = dto.first_name?.trim() ?? "";
  const lastName = [dto.first_last_name, dto.second_last_name]
    .filter(Boolean)
    .map((s) => s.trim())
    .join(" ");

  return {
    first_name: firstName,
    last_name: lastName,
    full_name: dto.full_name,
    dni: dto.document_number,
  };
}

export function normalizeSunatToVisitor(dto: SunatRucResponse, ruc: string) {
  return {
    ruc,
    company: dto.razonSocial ?? "",
  };
}
