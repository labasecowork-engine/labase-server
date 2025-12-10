import { Response } from "express";
import { DeleteCompanyService } from "./delete_company.service";
import { DeleteCompanyParamsSchema } from "../domain/delete_company.schema";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

export class DeleteCompanyController {
  constructor(private readonly service = new DeleteCompanyService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    const params = DeleteCompanyParamsSchema.parse(req.params);
    const authUser = await getAuthenticatedUser(req);

    const user = {
      id: authUser.id,
      role: authUser.role as "admin" | "client" | "employee",
    };

    const result = await this.service.execute(params.id, user);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(HttpStatusCodes.OK.code, result.message, req.path)
      );
  }
}
