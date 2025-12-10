import { WorkAreaEntity } from "../../../entities/workarea.entity";
import prisma from "../../../../../config/prisma_client";

export class ListWorkAreasRepository {
  async execute(): Promise<WorkAreaEntity[]> {
    const workareas = await prisma.work_areas.findMany({
      orderBy: {
        created_at: "desc",
      },
    });

    const workAreaEntities: WorkAreaEntity[] = workareas.map((workarea) => ({
      id: workarea.id,
      name: workarea.name,
      description: workarea.description,
      capacity: workarea.capacity,
      created_at: workarea.created_at,
      updated_at: workarea.updated_at,
    }));

    return workAreaEntities;
  }
}
