import prisma from "../../../../../config/prisma_client";
import { WorkAreaEntity } from "../../../entities/workarea.entity";

export class DeleteWorkAreaRepository {
  async execute(id: string): Promise<void> {
    await prisma.work_areas.delete({
      where: { id },
    });
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
}
