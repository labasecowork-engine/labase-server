import {
  ParkingRecordDTO,
  toRecordResponse,
} from "../../../entities/parking.entity";
import { ListRecordsQueryDTO } from "../domain/list_records.schema";
import { ListRecordsRepository } from "../data/list_records.repository";

interface PaginationInput {
  page: number;
  limit: number;
  skip: number;
}

export class ListRecordsService {
  constructor(private readonly repo = new ListRecordsRepository()) {}

  async execute(
    query: ListRecordsQueryDTO,
    pagination: PaginationInput
  ): Promise<{ records: ParkingRecordDTO[]; total: number }> {
    const params = {
      search: query.search,
      archived: query.archived === "true",
      date_from: query.date_from,
      date_to: query.date_to,
    };

    const [records, total] = await Promise.all([
      this.repo.findMany({
        ...params,
        skip: pagination.skip,
        take: pagination.limit,
      }),
      this.repo.count(params),
    ]);

    return { records: records.map(toRecordResponse), total };
  }
}
