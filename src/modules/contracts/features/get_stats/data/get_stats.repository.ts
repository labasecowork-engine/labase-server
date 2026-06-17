import prisma from "../../../../../config/prisma_client";

export class GetStatsRepository {
  // Trae los contratos activos con lo mínimo para derivar métricas y
  // vencimientos en memoria (el volumen es bajo: decenas de contratos).
  findActive() {
    return prisma.contract.findMany({
      where: { archived: false },
      select: {
        id: true,
        client_name: true,
        space_name: true,
        end_date: true,
        rent_amount: true,
        payments: { select: { amount: true } },
      },
    });
  }
}
