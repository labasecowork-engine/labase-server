import { ListSubscribeRepository } from "../data/list_subscribe.repository";
import { ListSubscribeResponseDTO } from "../domain/list_subscribe.dto";

export class ListSubscribeService {
  constructor(private readonly repository: ListSubscribeRepository) {}

  async execute(): Promise<ListSubscribeResponseDTO> {
    const [subscribers, total] = await Promise.all([
      this.repository.getAllSubscribers(),
      this.repository.countSubscribers(),
    ]);

    return {
      subscribers,
      total,
      count: subscribers.length,
    };
  }
}
