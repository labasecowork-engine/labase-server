import { ENVIRONMENT } from "../../../config/env";
import { SeedRepository } from "../data/seed.repository";

export class SeedService {
  constructor(private readonly repository = new SeedRepository()) {}
  async execute() {
    const data =
      ENVIRONMENT === "production"
        ? await this.repository.seedProduction()
        : await this.repository.seedDevelopment();
    return data;
  }
}
