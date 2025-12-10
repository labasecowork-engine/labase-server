import { HttpStatusCodes } from "../../constants";

const DEFAULT_PAGE = 1;
const DEFAULT_LIMIT = 10;
const MAX_LIMIT = 100;

export function buildHttpResponse(
  status: number,
  description: string,
  path?: string,
  data?: any,
  meta?: any
) {
  const response: any = {
    status,
    message:
      Object.values(HttpStatusCodes).find((s) => s.code === status)?.message ||
      "Error desconocido",
    description,
    timestamp: new Date().toISOString(),
    path: path || undefined,
    data: data || undefined,
  };

  if (meta !== undefined) {
    response.meta = meta;
  }

  return response;
}

export function getPaginationParams(query: any) {
  const page = Math.max(parseInt(query.page) || DEFAULT_PAGE, 1);
  const rawLimit = parseInt(query.limit);
  const limit = rawLimit > 0 ? Math.min(rawLimit, MAX_LIMIT) : DEFAULT_LIMIT;
  const skip = (page - 1) * limit;

  return { page, limit, skip };
}

export function buildPaginationMeta(
  total: number,
  page: number,
  limit: number
) {
  const totalPages = Math.ceil(total / limit) || 1;
  return {
    total,
    page,
    limit,
    total_pages: totalPages,
    has_next_page: page < totalPages,
    has_prev_page: page > 1,
  };
}
