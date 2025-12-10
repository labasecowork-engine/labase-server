import { Response } from "express";
import { UpdateCompanyService } from "./update_company.service";
import {
  UpdateCompanySchema,
  UpdateCompanyParamsSchema,
} from "../domain/update_company.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class UpdateCompanyController {
  constructor(private readonly service = new UpdateCompanyService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = UpdateCompanyParamsSchema.parse(req.params);
    const dto = UpdateCompanySchema.parse(req.body);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(params.id, dto, user);

    return res.status(HttpStatusCodes.OK.code).json(
      buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path, {
        company: result.company,
      })
    );
  }
}
