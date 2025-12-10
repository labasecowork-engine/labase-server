import { DirectRegistrationUseCase } from "../domain/direct_registration.use_case";
import { DirectRegistrationDTO } from "../domain/direct_registration.dto";

export class DirectRegistrationService {
  constructor(private readonly useCase: DirectRegistrationUseCase) {}

  async directRegistration(data: DirectRegistrationDTO) {
    return this.useCase.execute(data);
  }
}
