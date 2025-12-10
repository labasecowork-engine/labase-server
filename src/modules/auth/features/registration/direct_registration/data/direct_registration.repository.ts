import { User } from "../../../../domain/user.entity";
import { DirectRegistrationDTO } from "../domain/direct_registration.dto";
import { user_status } from "@prisma/client";
import prisma from "../../../../../../config/prisma_client";

export interface DirectRegistrationRepository {
  createUser(data: DirectRegistrationDTO): Promise<User>;
  getEmail(email: string): Promise<User | null>;
}

export class DirectRegistrationRepositoryImpl
  implements DirectRegistrationRepository
{
  async createUser(data: DirectRegistrationDTO): Promise<User> {
    const userData = await prisma.users.create({
      data: {
        first_name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        password: data.password,
        status: user_status.active,
        user_type: "client",
      },
    });

    await prisma.user_details.create({
      data: {
        user_id: userData.id,
        status: user_status.active,
      },
    });

    return new User(
      userData.id,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password,
      userData.status,
      userData.creation_timestamp ?? undefined,
      userData.user_type
    );
  }

  async getEmail(email: string): Promise<User | null> {
    const userData = await prisma.users.findUnique({
      where: { email },
    });

    if (!userData) return null;

    return new User(
      userData.id,
      userData.first_name,
      userData.last_name,
      userData.email,
      userData.password,
      userData.status,
      userData.creation_timestamp ?? undefined,
      userData.user_type
    );
  }
}
