// src/modules/employee/features/employee/update_employee/data/update_employee.repository.ts
import prisma from "../../../../../../config/prisma_client";
import { user_type, user_status, $Enums } from "@prisma/client";

interface UpdateEmployeeData {
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  user_type?: user_type;
  profile_image?: string;
  phone?: string;
  birth_date?: Date;
  gender?: $Enums.gender;
  status?: user_status;
  work_area_id?: string;
  company_id?: string;
}

export class UpdateEmployeeRepository {
  async findEmployeeById(employeeId: string) {
    return await prisma.employee_details.findUnique({
      where: { employee_id: employeeId },
      include: {
        user: {
          select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            user_type: true,
            status: true,
          },
        },
      },
    });
  }

  async findUserByEmail(email: string, excludeUserId?: string) {
    return await prisma.users.findFirst({
      where: {
        email,
        ...(excludeUserId && { id: { not: excludeUserId } }),
      },
    });
  }

  async updateEmployee(employeeId: string, data: UpdateEmployeeData) {
    const { work_area_id, company_id, ...userData } = data;

    const employeeDetailsData: { work_area_id?: string; company_id?: string } =
      {};
    if (work_area_id !== undefined)
      employeeDetailsData.work_area_id = work_area_id;
    if (company_id !== undefined) employeeDetailsData.company_id = company_id;

    return await prisma.$transaction(async (tx) => {
      const updatedUser = await tx.users.update({
        where: { id: employeeId },
        data: userData,
        select: {
          id: true,
          first_name: true,
          last_name: true,
          email: true,
          user_type: true,
          status: true,
        },
      });

      if (Object.keys(employeeDetailsData).length > 0) {
        await tx.employee_details.update({
          where: { employee_id: employeeId },
          data: employeeDetailsData,
        });
      }

      return updatedUser;
    });
  }
}
