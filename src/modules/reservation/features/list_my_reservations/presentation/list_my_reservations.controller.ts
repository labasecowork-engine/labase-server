import { Response } from "express";
import { ListMyReservationsService } from "./list_my_reservations.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { listMyReservationsQuerySchema } from "../domain/list_my_reservations.dto";
import { ZodError } from "zod";

export class ListMyReservationsController {
  constructor(private readonly service = new ListMyReservationsService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const user = await getAuthenticatedUser(req); // puede lanzar AppError

    try {
      // Validar los query parameters con Zod
      const validatedQuery = listMyReservationsQuerySchema.parse(req.query);

      const result = await this.service.execute(user.id, validatedQuery);

      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "My reservations",
            req.path,
            result
          )
        );
    } catch (error) {
      if (error instanceof ZodError) {
        return res
          .status(HttpStatusCodes.BAD_REQUEST.code)
          .json(
            buildHttpResponse(
              HttpStatusCodes.BAD_REQUEST.code,
              "Validation error",
              req.path,
              { errors: error.errors }
            )
          );
      }
      throw error; // Re-lanzar otros errores para que sean manejados por el middleware de errores
    }
  }
}
