import { ParkingPersonDTO } from "../../../entities/parking.entity";
import { SearchPeopleRepository } from "../data/search_people.repository";

export class SearchPeopleService {
  constructor(private readonly repo = new SearchPeopleRepository()) {}

  async execute(search?: string): Promise<ParkingPersonDTO[]> {
    const term = search?.trim() ?? "";
    if (!term) return [];

    const people = await this.repo.search(term);
    return people.map((person) => ({
      id: person.id,
      name: `${person.first_name} ${person.last_name}`,
      document: person.phone ?? null,
      company: person.employee_details?.company?.name ?? null,
    }));
  }
}
