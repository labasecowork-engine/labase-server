import { DeleteCompanyRepository } from "../data/delete_company.repository";
import { DeleteCompanyResponseDTO } from "../domain/delete_company.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class DeleteCompanyService {
  constructor(private readonly repository = new DeleteCompanyRepository()) {}

  async execute(
    id: string,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<DeleteCompanyResponseDTO> {
    // Verificar que solo administradores puedan eliminar empresas
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden eliminar empresas",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Verificar que la empresa existe
    const existingCompany = await this.repository.findById(id);
    if (!existingCompany) {
      throw new AppError(
        "Empresa no encontrada",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    // Eliminar la empresa
    await this.repository.execute(id);

    return {
      message: "Empresa eliminada exitosamente",
    };
  }
}
