import { DeleteWorkAreaRepository } from "../data/delete_workarea.repository";
import { DeleteWorkAreaResponseDTO } from "../domain/delete_workarea.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class DeleteWorkAreaService {
  constructor(private readonly repository = new DeleteWorkAreaRepository()) {}

  async execute(
    id: string,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<DeleteWorkAreaResponseDTO> {
    // Verificar que solo administradores puedan eliminar áreas de trabajo
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden eliminar áreas de trabajo",
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

    // Eliminar el área de trabajo
    await this.repository.execute(id);

    return {
      message: "Área de trabajo eliminada exitosamente",
    };
  }
}
