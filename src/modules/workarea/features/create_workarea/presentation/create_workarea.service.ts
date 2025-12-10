import { CreateWorkAreaRepository } from "../data/create_workarea.repository";
import {
  CreateWorkAreaDTO,
  CreateWorkAreaResponseDTO,
} from "../domain/create_workarea.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class CreateWorkAreaService {
  constructor(private readonly repository = new CreateWorkAreaRepository()) {}

  async execute(
    data: CreateWorkAreaDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<CreateWorkAreaResponseDTO> {
    // Verificar que solo administradores puedan crear áreas de trabajo
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden crear áreas de trabajo",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Verificar si ya existe un área de trabajo con el mismo nombre
    const nameExists = await this.repository.checkIfNameExists(data.name);
    if (nameExists) {
      throw new AppError(
        "Ya existe un área de trabajo con este nombre",
        HttpStatusCodes.CONFLICT.code
      );
    }

    // Crear el área de trabajo
    const workarea = await this.repository.execute(data);

    return {
      message: "Área de trabajo creada exitosamente",
      workarea,
    };
  }
}
