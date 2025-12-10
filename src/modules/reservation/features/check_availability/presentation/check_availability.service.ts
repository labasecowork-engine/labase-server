import { CheckAvailabilityDTO } from "../domain/check_availability.schema";
import { CheckAvailabilityRepository } from "../data/check_availability.repository";
import { reservation_status } from "@prisma/client";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { RESERVATION_MESSAGES as M } from "../../../../../constants/messages/reservation";

export class CheckAvailabilityService {
  constructor(private readonly repo = new CheckAvailabilityRepository()) {}

  private getCapacityStatuses(includePending = false): reservation_status[] {
    const base: reservation_status[] = [
      "confirmed",
      "in_progress",
    ] as reservation_status[];
    return includePending
      ? ([...base, "pending"] as reservation_status[])
      : base;
  }

  async execute(dto: CheckAvailabilityDTO) {
    const space = await this.repo.getSpaceById(dto.space_id);
    if (!space || space.disabled) {
      throw new AppError(M.SPACE_NOT_FOUND, HttpStatusCodes.NOT_FOUND.code);
    }

    const mode: "group" | "individual" = dto.full_room ? "group" : "individual";

    const statuses = this.getCapacityStatuses(/* includePending */ false);

    if (mode === "group") {
      if (!space.allow_full_room) {
        return {
          available: false,
          mode,
          reason: "FULL_ROOM_NOT_ALLOWED",
          statuses_considered: statuses,
        };
      }

      const blocking = await this.repo.findBlockingFullRoom(
        dto.space_id,
        dto.start_time,
        dto.end_time,
        statuses
      );
      if (blocking) {
        return {
          available: false,
          mode,
          reason: "FULL_ROOM_BLOCKED",
          statuses_considered: statuses,
        };
      }

      return {
        available: true,
        mode,
        reason: "OK",
        statuses_considered: statuses,
      };
    }

    if (!space.allow_by_unit && space.type === "unit") {
      return {
        available: false,
        mode,
        reason: "UNIT_BOOKING_FORBIDDEN",
        statuses_considered: statuses,
      };
    }

    if (dto.people! < space.capacity_min || dto.people! > space.capacity_max) {
      return {
        available: false,
        mode,
        reason: "CAPACITY_OUT_OF_RANGE",
        requested_people: dto.people,
        capacity_min: space.capacity_min,
        capacity_max: space.capacity_max,
        statuses_considered: statuses,
      };
    }

    const blocking = await this.repo.findBlockingFullRoom(
      dto.space_id,
      dto.start_time,
      dto.end_time,
      statuses
    );
    if (blocking) {
      return {
        available: false,
        mode,
        reason: "BLOCKED_BY_FULL_ROOM",
        statuses_considered: statuses,
      };
    }

    const booked = await this.repo.sumBookedPeople(
      dto.space_id,
      dto.start_time,
      dto.end_time,
      statuses
    );
    const capacity_left = Math.max(0, space.capacity_max - booked);

    if (dto.people! > capacity_left) {
      return {
        available: false,
        mode,
        reason: "NO_CAPACITY_LEFT",
        requested_people: dto.people,
        capacity_left,
        capacity_max: space.capacity_max,
        booked_people: booked,
        statuses_considered: statuses,
      };
    }

    return {
      available: true,
      mode,
      reason: "OK",
      requested_people: dto.people,
      capacity_left,
      capacity_max: space.capacity_max,
      booked_people: booked,
      statuses_considered: statuses,
    };
  }
}
