// src/modules/employee/features/employee/create_employee/data/create_employee.repository.ts
import prisma from "../../../../../../config/prisma_client";
import { Prisma, user_type, user_status } from "@prisma/client";

type Gender = Prisma.usersCreateInput["gender"];

interface CreateEmployeeData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  user_type: user_type;
  profile_image?: string;
  phone?: string;
  birth_date?: Date;
  gender?: Gender;
  work_area_id?: string;
  company_id?: string;
}
export class CreateEmployeeRepository {
  async findUserByEmail(email: string) {
    return await prisma.users.findUnique({ where: { email } });
  }

  async createEmployee(data: CreateEmployeeData) {
    return await prisma.$transaction(async (tx) => {
      const user = await tx.users.create({
        data: {
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          password: data.password,
          user_type: data.user_type,
          profile_image: data.profile_image,
          phone: data.phone,
          birth_date: data.birth_date,
          status: "active" as user_status,
          ...(data.gender && { gender: data.gender }),
        },
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          user_type: true,
          gender: true,
          status: true,
        },
      });

      const employee = await tx.employee_details.create({
        data: {
          employee_id: user.id,
          work_area_id: data.work_area_id ?? null,
          company_id: data.company_id ?? null,
        },
      });

      return {
        employee_id: employee.employee_id,
        user,
      };
    });
  }
}
