import { Router } from "express";
import { DirectRegistrationController } from "./direct_registration.controller";
import { DirectRegistrationService } from "./direct_registration.service";
import { DirectRegistrationUseCase } from "../domain/direct_registration.use_case";
import { DirectRegistrationRepositoryImpl } from "../data/direct_registration.repository";

const router = Router();

const repository = new DirectRegistrationRepositoryImpl();
const useCase = new DirectRegistrationUseCase(repository);
const service = new DirectRegistrationService(useCase);
const controller = new DirectRegistrationController(service);

router.post("/direct", (req, res) => controller.directRegistration(req, res));

export { router as directRegistrationRouter };
