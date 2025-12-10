import { Response } from "express";
import { ListUsersService } from "./list_users.service";
import { buildHttpResponse, getAuthenticatedUser } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";
import { ListUsersSchema } from "../domain/list_users.schema";

export class ListUsersController {
  constructor(private readonly service = new ListUsersService()) {}

  async handle(req: AuthenticatedRequest, res: Response) {
    await getAuthenticatedUser(req);

    const validatedParams = ListUsersSchema.parse(req.query);

    const result = await this.service.execute(validatedParams);

    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Users list",
          req.path,
          result
        )
      );
  }
}
