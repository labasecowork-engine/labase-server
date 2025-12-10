import { UpdateWorkAreaRepository } from "../data/update_workarea.repository";
import {
  UpdateWorkAreaDTO,
  UpdateWorkAreaResponseDTO,
} from "../domain/update_workarea.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class UpdateWorkAreaService {
  constructor(private readonly repository = new UpdateWorkAreaRepository()) {}

  async execute(
    id: string,
    data: UpdateWorkAreaDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<UpdateWorkAreaResponseDTO> {
    // Verificar que solo administradores puedan actualizar áreas de trabajo
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden actualizar áreas de trabajo",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Verificar que el área de trabajo existe
    const existingWorkArea = await this.repository.findById(id);
    if (!existingWorkArea) {
      throw new AppError(
        "Área de trabajo no encontrada",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    // Verificar si el nuevo nombre ya existe (si se está cambiando el nombre)
    if (data.name && data.name !== existingWorkArea.name) {
      const nameExists = await this.repository.checkIfNameExistsExcludingId(
        data.name,
        id
      );
      if (nameExists) {
        throw new AppError(
          "Ya existe un área de trabajo con este nombre",
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    // Actualizar el área de trabajo
    const workarea = await this.repository.execute(id, data);

    return {
      message: "Área de trabajo actualizada exitosamente",
      workarea,
    };
  }
}
