import { ListUsersRepository } from "../data/list_users.repository";
import { ListUsersParams } from "../domain/list_users.schema";

export class ListUsersService {
  constructor(private readonly repo = new ListUsersRepository()) {}

  async execute(params: ListUsersParams) {
    return this.repo.listMany(params);
  }
}
