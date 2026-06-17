import { Request, Response } from "express";
import { ListAssignmentsService } from "./list_assignments.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class ListAssignmentsController {
  constructor(private readonly service = new ListAssignmentsService()) {}

  async handle(req: Request, res: Response) {
    const assignments = await this.service.execute();
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Asignaciones de lockers obtenidas correctamente",
          req.path,
          assignments
        )
      );
  }
}
