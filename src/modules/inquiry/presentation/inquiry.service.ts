import { sendEmail } from "../../../utils/";
import { inquiryDTO } from "../domain/inquiry.dto";
import { EMAIL_USER } from "../../../config/env";
import path from "path";
import ejs from "ejs";

export const inquiryService = async (
  dto: inquiryDTO
): Promise<void> => {
  if (!EMAIL_USER) {
    throw new Error("EMAIL_USER is not defined in environment variables");
  }

  const fullName = `${dto.firstName} ${dto.lastName}`;

  const plainText = `
Nombre: ${fullName}
Correo: ${dto.email}
Celular: ${dto.phoneNumber || "-"}
Motivo: ${dto.reason}
Mensaje:
${dto.message}
  `.trim();

  const filePath = path.join(
    process.cwd(),
    "public",
    "templates",
    "contact.ejs"
  );

  const html = await ejs.renderFile(filePath, {
    name: fullName,
    email: dto.email,
    phoneNumber: dto.phoneNumber,
    reason: dto.reason,
    message: dto.message,
  });

  await sendEmail(
    "labase.developers@gmail.com",
    `Contacto: ${dto.reason}`,
    plainText,
    html
  );
};
