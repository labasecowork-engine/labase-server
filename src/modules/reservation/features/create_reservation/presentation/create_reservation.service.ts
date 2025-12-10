import {
  differenceInHours,
  differenceInDays,
  differenceInWeeks,
  differenceInMonths,
} from "date-fns";
import { CreateReservationDTO } from "../domain/create_reservation.dto";
import { CreateReservationRepository } from "../data/create_reservation.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { RESERVATION_MESSAGES } from "../../../../../constants/messages/reservation";
import { generateQrCode } from "../../../../../utils/qr_code";
import { io } from "../../../../../config/socket";
import { reservation } from "@prisma/client";
import type { CurrentUser } from "../../../../../utils/";

function generatePurchaseNumber(): string {
  const ts = Date.now().toString(); // 13 dígitos
  const rand = Math.floor(Math.random() * 1e6)
    .toString()
    .padStart(6, "0");
  return (ts.slice(-9) + rand).slice(0, 12);
}

export class CreateReservationService {
  constructor(private readonly repo = new CreateReservationRepository()) {}

  async execute(dto: CreateReservationDTO, user: CurrentUser) {
    if (user.role === "employee") {
      throw new AppError(
        "USER_TYPE_NOT_ALLOWED",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    if (dto.user_id) {
      const user = await this.repo.findUserById(dto.user_id);
      if (!user) {
        throw new AppError(
          RESERVATION_MESSAGES.USER_NOT_FOUND,
          HttpStatusCodes.NOT_FOUND.code
        );
      }
    }

    const space = await this.repo.findSpaceById(dto.space_id);
    if (!space || space.disabled) {
      throw new AppError(
        RESERVATION_MESSAGES.SPACE_NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    if (dto.people < space.capacity_min || dto.people > space.capacity_max) {
      throw new AppError(
        RESERVATION_MESSAGES.CAPACITY_OUT_OF_RANGE,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (dto.full_room && !space.allow_full_room) {
      throw new AppError(
        RESERVATION_MESSAGES.FULL_ROOM_FORBIDDEN,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (!dto.full_room && !space.allow_by_unit && space.type === "unit") {
      throw new AppError(
        RESERVATION_MESSAGES.UNIT_BOOKING_FORBIDDEN,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    if (dto.full_room) {
      const overlap = await this.repo.findOverlaps(
        dto.space_id,
        dto.start_time,
        dto.end_time
      );
      if (overlap) {
        throw new AppError(
          RESERVATION_MESSAGES.TIME_OVERLAP,
          HttpStatusCodes.CONFLICT.code
        );
      }
    } else {
      const booked = await this.repo.sumPeople(
        dto.space_id,
        dto.start_time,
        dto.end_time
      );
      if (booked + dto.people > space.capacity_max) {
        throw new AppError(
          RESERVATION_MESSAGES.NO_CAPACITY_LEFT,
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    const mode: "individual" | "group" = dto.full_room ? "group" : "individual";
    const prices = (
      space.prices as Array<{
        duration: "hour" | "day" | "week" | "month";
        amount: number;
        mode: "individual" | "group";
      }>
    ).filter((p) => p.mode === mode);

    const months = differenceInMonths(dto.end_time, dto.start_time);
    const weeks = differenceInWeeks(dto.end_time, dto.start_time);
    const days = differenceInDays(dto.end_time, dto.start_time);
    const hours = differenceInHours(dto.end_time, dto.start_time);

    const rateOf = (u: "hour" | "day" | "week" | "month") =>
      prices.find((p) => p.duration === u)?.amount ?? null;

    let unit: "month" | "week" | "day" | "hour";
    let count: number;

    if (months >= 1 && rateOf("month") !== null) {
      unit = "month";
      count = months;
    } else if (weeks >= 1 && rateOf("week") !== null) {
      unit = "week";
      count = weeks;
    } else if (days >= 1 && rateOf("day") !== null) {
      unit = "day";
      count = days;
    } else if (rateOf("hour") !== null) {
      unit = "hour";
      count = Math.max(1, hours);
    } else {
      throw new AppError(
        RESERVATION_MESSAGES.PRICE_NOT_DEFINED,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const rate = rateOf(unit)!;
    const price =
      mode === "individual" ? count * rate * dto.people : count * rate;

    const status: reservation["status"] =
      user.role === "admin" ? "confirmed" : "pending";

    const purchaseNumber = generatePurchaseNumber();

    const codeQr = generateQrCode();

    const userId = dto.user_id ?? user.id;
    const created = await this.repo.create({
      space: { connect: { id: dto.space_id } },
      user: { connect: { id: userId } },
      start_time: dto.start_time,
      end_time: dto.end_time,
      people: dto.people,
      full_room: dto.full_room,
      code_qr: codeQr,
      price: Number(price),
      status,
      purchase_number: purchaseNumber,
    });

    io.emit("RESERVATION_CREATED", {
      reservationId: created.id,
      userId: user.id,
      startTime: dto.start_time,
      endTime: dto.end_time,
      spaceId: dto.space_id,
    });

    return {
      message: RESERVATION_MESSAGES.CREATED_SUCCESS,
      reservation_id: created.id,
      code_qr: created.code_qr,
      price,
      status: created.status,
    };
  }
}
