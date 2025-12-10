import prisma from "../../../../../config/prisma_client";
import { CreateWorkAreaDTO } from "../domain/create_workarea.dto";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class CreateWorkAreaRepository {
  async execute(data: CreateWorkAreaDTO): Promise<WorkAreaEntity> {
    const workarea = await prisma.work_areas.create({
      data: {
        name: data.name,
        description: data.description || null,
        capacity: data.capacity,
      },
    });

    return {
      id: workarea.id,
      name: workarea.name,
      description: workarea.description,
      capacity: workarea.capacity,
      created_at: workarea.created_at,
      updated_at: workarea.updated_at,
    };
  }

  async checkIfNameExists(name: string): Promise<boolean> {
    const existingWorkArea = await prisma.work_areas.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
      },
    });

    return !!existingWorkArea;
  }
}
