import {
  ClientAttendanceDTO,
  toRecordResponse,
} from "../../../entities/client_attendance.entity";
import { ListPresentRepository } from "../data/list_present.repository";

export class ListPresentService {
  constructor(private readonly repo = new ListPresentRepository()) {}

  async execute(): Promise<ClientAttendanceDTO[]> {
    const rows = await this.repo.findPresent();
    return rows.map(toRecordResponse);
  }
}
