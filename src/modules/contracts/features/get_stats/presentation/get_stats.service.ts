import {
  ContractStatsDTO,
  EXPIRING_SOON_DAYS,
  ExpiringContractDTO,
  daysToExpire,
  paidAmount,
} from "../../../entities/contract.entity";
import { GetStatsRepository } from "../data/get_stats.repository";

export class GetStatsService {
  constructor(private readonly repo = new GetStatsRepository()) {}

  async execute(): Promise<ContractStatsDTO> {
    const contracts = await this.repo.findActive();
    const now = new Date();

    let pending = 0;
    let expired = 0;
    const expiring: ExpiringContractDTO[] = [];

    for (const contract of contracts) {
      const rent = Number(contract.rent_amount);
      if (rent > 0 && paidAmount(contract.payments) < rent) pending += 1;

      const days = daysToExpire(contract.end_date, now);
      if (days < 0) {
        expired += 1;
      } else if (days <= EXPIRING_SOON_DAYS) {
        expiring.push({
          id: contract.id,
          client_name: contract.client_name,
          days,
          space_name: contract.space_name,
        });
      }
    }

    expiring.sort((a, b) => a.days - b.days);

    return {
      total: contracts.length,
      pending,
      expired,
      expiring_soon: expiring.length,
      expiring,
    };
  }
}
