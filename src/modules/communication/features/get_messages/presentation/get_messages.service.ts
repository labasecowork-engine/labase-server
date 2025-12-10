import { GetMessagesRepository } from "../data/get_messages.repository";
import { GetMessagesResponseDTO } from "../domain/get_messages.dto";

export class GetMessagesService {
  constructor(private readonly repository = new GetMessagesRepository()) {}

  async execute(): Promise<GetMessagesResponseDTO> {
    const messages = await this.repository.findAll();

    return {
      message: "Mensajes obtenidos exitosamente",
      messages,
    };
  }
}
