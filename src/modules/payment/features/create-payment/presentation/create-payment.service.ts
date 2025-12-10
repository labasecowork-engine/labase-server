import { CreatePaymentDTO } from "../domain/create-payment.schema";
import { CreatePaymentRepository } from "../data/create-payment.repository";
import { PaymentTransactionRepository } from "../data/payment-transaction.repository";
import { CreateReservationRepository } from "../../../../reservation/features/create_reservation/data/create_reservation.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

type EnrichedPaymentDTO = CreatePaymentDTO & {
  purchaseNumber: string;
  amount: number;
  currency: "PEN" | "USD";
};

export class CreatePaymentService {
  private paymentRepo = new CreatePaymentRepository();
  private txRepo = new PaymentTransactionRepository();
  private reservRepo = new CreateReservationRepository();

  async execute(dto: CreatePaymentDTO, userId: string) {
    // 1. Validar reserva
    const reservation = await this.reservRepo.findById(dto.reservationId);
    console.log(reservation);
    if (!reservation) {
      throw new AppError(
        "RESERVATION_NOT_FOUND",
        HttpStatusCodes.NOT_FOUND.code
      );
    }
    if (reservation.status !== "pending") {
      throw new AppError(
        "PAYMENT_NOT_ALLOWED",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
    if (reservation.user_id !== userId) {
      throw new AppError("FORBIDDEN_PAYMENT", HttpStatusCodes.FORBIDDEN.code);
    }

    // 2. Crear DTO enriquecido
    const enrichedDto: EnrichedPaymentDTO = {
      ...dto,
      reservationId: dto.reservationId,
      metadata: {
        antifraud: {
          clientIp: dto.metadata?.antifraud?.clientIp,
          merchantDefineData: {
            MDD4: "correo@gmail.com",
            MDD32: "1234567890",
            MDD75: 1,
            MDD77: "Invitado",
          },
        },
        dataMap: dto.metadata?.dataMap ?? {
          urlAddress: process.env.FRONTEND_URL ?? "https://demo.labase.pe",
          serviceLocationCityName: "Lima",
          serviceLocationCountrySubdivisionCode: "LIM",
          serviceLocationCountryCode: "PER",
          serviceLocationPostalCode: "15074",
        },
      },
      purchaseNumber: reservation.purchase_number,
      amount: reservation.price.toNumber(),
      currency: "PEN",
    };

    // 3. Ejecutar flujo de pago
    const result = await this.paymentRepo.execute(enrichedDto);

    return {
      ...result,
      amount: enrichedDto.amount,
    };
  }
}
