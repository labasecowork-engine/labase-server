import { reservation } from "@prisma/client";
import { CreatePaymentDTO } from "../domain/create-payment.dto";
import { resolvePaymentProvider } from "../../../../../shared/payments/utils/payments.helpers";
import prisma from "../../../../../config/prisma_client";

export interface StartPaymentResult {
  purchaseNumber: string;
  sessionToken: string;
}

type EnrichedPaymentDTO = CreatePaymentDTO & {
  purchaseNumber: string;
  amount: number;
  currency: "PEN" | "USD";
};

export class CreatePaymentRepository {
  private provider = resolvePaymentProvider();

  async execute(dto: EnrichedPaymentDTO): Promise<StartPaymentResult> {
    const sessionRequest = {
      channel: "web",
      purchaseNumber: dto.purchaseNumber,
      amount: dto.amount,
      currency: dto.currency,
      metadata: dto.metadata,
    };

    const accessToken = await this.provider.getAccessToken();

    const sessionToken = await this.provider.getSessionToken(
      accessToken,
      sessionRequest
    );

    return {
      purchaseNumber: dto.purchaseNumber,
      sessionToken,
    };
  }
}

/**
 * Repositorio para validar y actualizar reservas desde el módulo de pago
 */
export class ReservationRepository {
  async findById(id: string): Promise<reservation | null> {
    return prisma.reservation.findUnique({
      where: { id },
    });
  }
  async updateStatus(
    id: string,
    status: reservation["status"]
  ): Promise<reservation> {
    return prisma.reservation.update({
      where: { id },
      data: { status },
    });
  }
}
