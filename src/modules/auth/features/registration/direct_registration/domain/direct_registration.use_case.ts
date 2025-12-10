import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants";
import { DirectRegistrationRepository } from "../data/direct_registration.repository";
import {
  DirectRegistrationDTO,
  DirectRegistrationResponseDTO,
} from "./direct_registration.dto";
import bcrypt from "bcrypt";

export class DirectRegistrationUseCase {
  constructor(private readonly repository: DirectRegistrationRepository) {}

  async execute(data: DirectRegistrationDTO) {
    const existingUser = await this.repository.getEmail(data.email);
    if (existingUser) {
      throw new AppError(
        "El correo electrónico ya está en uso, por favor verifica que el correo electrónico sea correcto.",
        HttpStatusCodes.BAD_REQUEST.code
      );
    }

    const dataEncrypted = {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    };

    const user = await this.repository.createUser(dataEncrypted);

    return {
      message: "Usuario creado exitosamente",
    };
  }
}
