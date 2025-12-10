import { UpdateCompanyRepository } from "../data/update_company.repository";
import {
  UpdateCompanyDTO,
  UpdateCompanyResponseDTO,
} from "../domain/update_company.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class UpdateCompanyService {
  constructor(private readonly repository = new UpdateCompanyRepository()) {}

  async execute(
    id: string,
    data: UpdateCompanyDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<UpdateCompanyResponseDTO> {
    // Verificar que solo administradores puedan actualizar empresas
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden actualizar empresas",
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

    // Verificar si el nuevo nombre ya existe (si se está cambiando el nombre)
    if (data.name && data.name !== existingCompany.name) {
      const nameExists = await this.repository.checkIfNameExistsExcludingId(
        data.name,
        id
      );
      if (nameExists) {
        throw new AppError(
          "Ya existe una empresa con este nombre",
          HttpStatusCodes.CONFLICT.code
        );
      }
    }

    // Actualizar la empresa
    const company = await this.repository.execute(id, data);

    return {
      message: "Empresa actualizada exitosamente",
      company,
    };
  }
}
