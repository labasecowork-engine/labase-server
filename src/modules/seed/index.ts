import { config } from "dotenv";
import { SeedService } from "./presentation/seed.service";

config();

async function runSeed() {
  try {
    const seedService = new SeedService();
    const result = await seedService.execute();

    console.log(result);
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

runSeed();
