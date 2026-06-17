import {
  ContractDTO,
  toContractResponse,
} from "../../../entities/contract.entity";
import { RenewContractRepository } from "../data/renew_contract.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants";

export class RenewContractService {
  constructor(private readonly repo = new RenewContractRepository()) {}

  // Renovar = duplicar el contrato con un nuevo período que arranca al terminar
  // el anterior, preservando la misma duración. El nuevo contrato no hereda los
  // pagos.
  async execute(id: string): Promise<ContractDTO> {
    const previous = await this.repo.findById(id);
    if (!previous) {
      throw new AppError(
        "El contrato no existe",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const duration = Math.max(
      previous.end_date.getTime() - previous.start_date.getTime(),
      0
    );
    const newStart = previous.end_date;
    const newEnd = new Date(previous.end_date.getTime() + duration);

    const created = await this.repo.create({
      user_id: previous.user_id,
      client_name: previous.client_name,
      company: previous.company,
      responsible: previous.responsible,
      document: previous.document,
      phone: previous.phone,
      address: previous.address,
      follow_up: previous.follow_up,
      plan: previous.plan,
      contract_type: previous.contract_type,
      space_name: previous.space_name,
      rent_reference_start: previous.rent_reference_start,
      start_date: newStart,
      end_date: newEnd,
      rent_amount: previous.rent_amount,
      monthly_payment: previous.monthly_payment,
      invoice_number: previous.invoice_number,
      wifi: previous.wifi,
      locker_ref: previous.locker_ref,
      num_users: previous.num_users,
      archived: false,
    });

    return toContractResponse(created);
  }
}
