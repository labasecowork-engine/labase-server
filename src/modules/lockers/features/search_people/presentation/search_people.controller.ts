import { Request, Response } from "express";
import { SearchPeopleSchema } from "../domain/search_people.schema";
import { SearchPeopleService } from "./search_people.service";
import { buildHttpResponse } from "../../../../../utils/";
import { HttpStatusCodes } from "../../../../../constants";

export class SearchPeopleController {
  constructor(private readonly service = new SearchPeopleService()) {}

  async handle(req: Request, res: Response) {
    const { search } = SearchPeopleSchema.parse(req.query);
    const people = await this.service.execute(search);
    return res
      .status(HttpStatusCodes.OK.code)
      .json(
        buildHttpResponse(
          HttpStatusCodes.OK.code,
          "Personas encontradas",
          req.path,
          people
        )
      );
  }
}
