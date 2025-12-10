import dotenv from "dotenv";
dotenv.config();

export const PAYMENT_PROVIDER = process.env.PAYMENT_PROVIDER || "niubiz";

export const NIUBIZ_USER = process.env.NIUBIZ_USER!;
export const NIUBIZ_PWD = process.env.NIUBIZ_PWD!;
export const NIUBIZ_URL_SECURITY = process.env.NIUBIZ_URL_SECURITY!;
export const NIUBIZ_URL_SESSION = process.env.NIUBIZ_URL_SESSION!;
export const NIUBIZ_URL_JS = process.env.NIUBIZ_URL_JS!;
export const NIUBIZ_MERCHANT_ID = process.env.NIUBIZ_MERCHANT_ID!;
export const NIUBIZ_URL_AUTHORIZATION = process.env.NIUBIZ_URL_AUTHORIZATION!;

if (!NIUBIZ_USER || !NIUBIZ_PWD) {
  throw new Error("Faltan credenciales Niubiz en .env");
}
