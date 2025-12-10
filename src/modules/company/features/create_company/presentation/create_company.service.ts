import { CreateCompanyRepository } from "../data/create_company.repository";
import {
  CreateCompanyDTO,
  CreateCompanyResponseDTO,
} from "../domain/create_company.dto";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";

export class CreateCompanyService {
  constructor(private readonly repository = new CreateCompanyRepository()) {}

  async execute(
    data: CreateCompanyDTO,
    user: { id: string; role: "admin" | "client" | "employee" }
  ): Promise<CreateCompanyResponseDTO> {
    // Verificar que solo administradores puedan crear empresas
    if (user.role !== "admin") {
      throw new AppError(
        "Solo los administradores pueden crear empresas",
        HttpStatusCodes.FORBIDDEN.code
      );
    }

    // Verificar si ya existe una empresa con el mismo nombre
    const nameExists = await this.repository.checkIfNameExists(data.name);
    if (nameExists) {
      throw new AppError(
        "Ya existe una empresa con este nombre",
        HttpStatusCodes.CONFLICT.code
      );
    }

    // Crear la empresa
    const company = await this.repository.execute(data);

    return {
      message: "Empresa creada exitosamente",
      company,
    };
  }
}
