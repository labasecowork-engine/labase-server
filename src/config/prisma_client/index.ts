// Carga y expande el .env antes de construir el cliente, para que
// DATABASE_URL esté resuelto sin depender del orden de imports.
import "../env";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
