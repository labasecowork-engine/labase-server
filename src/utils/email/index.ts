import { Attachment } from "nodemailer/lib/mailer";
import transporter from "../../config/email";
import { EMAIL_USER } from "../../config/env";
import { resolveImagePath } from "../path";

export async function sendEmail(
  to: string,
  subject: string,
  text: string,
  html?: string,
  attachments?: Attachment[]
): Promise<void> {
  try {
    const logoPath = resolveImagePath("logo.png");

    await transporter.sendMail({
      from: EMAIL_USER,
      to,
      subject,
      text,
      html,
      attachments: [
        {
          filename: "logo.png",
          path: logoPath,
          cid: "logo",
        },
        ...(attachments || []),
      ],
    });
  } catch (error) {
    throw new Error("Error al enviar el correo electrónico");
  }
}

export const testEmail = async () => {
  try {
    await sendEmail(
      "jhonny-529@outlook.com",
      "Test de Correo",
      "Prueba desde Nodemailer con GoDaddy.",
      "<h1>Correo de Prueba</h1><p>El envio está bien configurado</p>"
    );

    console.log("El correo se ha enviado, revisa tu bandeja de entrada.");
  } catch (error) {
    console.error("No se envió el correo, error:", error);
  }
};
