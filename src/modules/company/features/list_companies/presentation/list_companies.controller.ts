import { Response } from "express";
import { ListCompaniesService } from "./list_companies.service";
import { ListCompaniesSchema } from "../domain/list_companies.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class ListCompaniesController {
  constructor(private readonly service = new ListCompaniesService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    // Verificamos el query params
    // req.query = {search: 134}
    // Lanzamos un error de zod si el query params no es válido
    const filters = ListCompaniesSchema.parse(req.query);
    // Verificamos el usuario autenticado
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    // Ejecutamos el servicio
    const result = await this.service.execute(filters, user); // aquí estarian todos las compañias

    return res
      .status(
        HttpStatusCodes.OK.code // 200
      )
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, "OK", req.path, result)
      );
  }
}
