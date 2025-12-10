import { generateToken } from "../../../../../../infrastructure/jwt";
import { LoginDTO, LoginResponseDTO } from "./login_with_email.dto";
import { LoginRepository } from "../data/login_with_email.repository";
import { AppError } from "../../../../../../types/";
import { HttpStatusCodes } from "../../../../../../constants";
import bcrypt from "bcrypt";
import prisma from "../../../../../../config/prisma_client";

export class LoginUseCase {
  constructor(private readonly loginRepository: LoginRepository) {}

  async execute(data: LoginDTO): Promise<LoginResponseDTO> {
    const user = await this.loginRepository.getEmail(data.email);
    if (!user) {
      throw new AppError(
        "El usuario no existe, revisa que el correo electrónico sea correcto.",
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    const isPasswordValid = await bcrypt.compare(data.password, user.password);
    if (!isPasswordValid) {
      throw new AppError(
        "Credenciales inválidas, revisa que el correo electrónico y la contraseña sean correctos.",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    if (!user.isVerified()) {
      throw new AppError(
        "El usuario no está verificado, por favor verifica tu correo electrónico.",
        HttpStatusCodes.UNAUTHORIZED.code
      );
    }

    let adminRole: string | undefined = undefined;

    if (user.user_type === "admin") {
      const adminData = await prisma.admin_details.findUnique({
        where: { admin_id: user.id },
        select: { role: true },
      });

      if (adminData) {
        adminRole = adminData.role;
      }
    }

    let role = "";

    if (user.user_type === "admin") {
      role = adminRole ?? "";
    } else if (user.user_type === "employee") {
      role = "employee";
    } else if (user.user_type === "client") {
      role = "client";
    } else {
      role = "client";
    }

    const token = generateToken({
      id: user.id,
      user_type: role,
      ...(adminRole ? { role: adminRole } : {}),
    });

    return {
      user: {
        id: user.id,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        userType: user.user_type ?? null,
        role: adminRole ?? null,
      },
      token,
    };
  }
}
