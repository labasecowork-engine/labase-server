import prisma from "../../../../../config/prisma_client";
import { UpdateWorkAreaDTO } from "../domain/update_workarea.dto";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class UpdateWorkAreaRepository {
  async execute(id: string, data: UpdateWorkAreaDTO): Promise<WorkAreaEntity> {
    const workarea = await prisma.work_areas.update({
      where: { id },
      data: {
        ...(data.name && { name: data.name }),
        ...(data.description !== undefined && {
          description: data.description,
        }),
        ...(data.capacity && { capacity: data.capacity }),
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

  async findById(id: string): Promise<WorkAreaEntity | null> {
    const workarea = await prisma.work_areas.findUnique({
      where: { id },
    });

    if (!workarea) return null;

    return {
      id: workarea.id,
      name: workarea.name,
      description: workarea.description,
      capacity: workarea.capacity,
      created_at: workarea.created_at,
      updated_at: workarea.updated_at,
    };
  }

  async checkIfNameExistsExcludingId(
    name: string,
    excludeId: string
  ): Promise<boolean> {
    const existingWorkArea = await prisma.work_areas.findFirst({
      where: {
        name: {
          equals: name,
          mode: "insensitive",
        },
        id: {
          not: excludeId,
        },
      },
    });

    return !!existingWorkArea;
  }
}
