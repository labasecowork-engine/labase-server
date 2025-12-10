import { EditSpaceDTO } from "../domain/edit_space.schema";
import { EditSpaceRepository } from "../data/edit_space.repository";
import { AppError } from "../../../../../types/";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { deleteFile } from "../../../../../infrastructure/aws";
import { SPACE_MESSAGES } from "../../../../../constants/messages/space";

interface ImageData {
  keepImages: Array<{
    id: string;
    url: string;
    position: number;
  }>;
  newImages: string[];
}

export class EditSpaceService {
  constructor(private readonly repo = new EditSpaceRepository()) {}

  async execute(id: string, dto: EditSpaceDTO, imageData: ImageData) {
    const exists = await this.repo.findById(id);
    if (!exists) {
      throw new AppError(
        SPACE_MESSAGES.NOT_FOUND,
        HttpStatusCodes.NOT_FOUND.code
      );
    }

    this.validateKeepImages(exists.space_images, imageData.keepImages);

    const imagesToDelete = this.getImagesToDelete(
      exists.space_images,
      imageData.keepImages
    );

    if (imagesToDelete.length > 0) {
      const deletions = imagesToDelete.map((img) => {
        const key = new URL(img.url).pathname.slice(1);
        return deleteFile(key);
      });
      await Promise.allSettled(deletions);
    }

    const { benefit_ids, keep_images, prices, ...data } = dto;

    const imageUpdateData = this.prepareImageUpdateData(
      imageData.keepImages,
      imageData.newImages
    );

    const updateData: Parameters<EditSpaceRepository["update"]>[1] = {
      ...(data.name !== undefined && { name: data.name }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.type !== undefined && { type: data.type }),
      ...(data.access !== undefined && { access: data.access }),
      ...(data.capacity_min !== undefined && {
        capacity_min: data.capacity_min,
      }),
      ...(data.capacity_max !== undefined && {
        capacity_max: data.capacity_max,
      }),
      ...(data.allow_by_unit !== undefined && {
        allow_by_unit: data.allow_by_unit,
      }),
      ...(data.allow_full_room !== undefined && {
        allow_full_room: data.allow_full_room,
      }),
      ...(data.disabled !== undefined && { disabled: data.disabled }),

      space_images: imageUpdateData,

      ...(benefit_ids !== undefined
        ? {
            space_benefits: {
              deleteMany: {},
              ...(benefit_ids.length
                ? {
                    create: benefit_ids.map((bid) => ({
                      benefit: { connect: { id: bid } },
                    })),
                  }
                : {}),
            },
          }
        : {}),

      ...(prices !== undefined
        ? {
            prices: {
              deleteMany: {},
              ...(prices.length
                ? {
                    create: prices.map((p) => ({
                      duration: p.duration,
                      mode: p.mode,
                      amount: p.amount,
                    })),
                  }
                : {}),
            },
          }
        : {}),
    };

    const updated = await this.repo.update(id, updateData);
    return updated;
  }

  private getImagesToDelete(
    existingImages: Array<{ id: string; url: string }>,
    keepImages: Array<{ id: string; url: string; position: number }>
  ) {
    const keepImageIds = new Set(keepImages.map((img) => img.id));

    return existingImages.filter((img) => !keepImageIds.has(img.id));
  }

  private prepareImageUpdateData(
    keepImages: Array<{ id: string; url: string; position: number }>,
    newImages: string[]
  ) {
    if (keepImages.length === 0 && newImages.length === 0) {
      return {
        deleteMany: {},
      };
    }

    const allImages = [
      ...keepImages.map((img) => ({
        url: img.url,
        position: img.position,
      })),
      ...newImages.map((url, idx) => ({
        url,
        position: keepImages.length + idx,
      })),
    ];

    return {
      deleteMany: {},
      create: allImages,
    };
  }

  private validateKeepImages(
    existingImages: Array<{ id: string; url: string }>,
    keepImages: Array<{ id: string; url: string; position: number }>
  ) {
    const existingImageIds = new Set(existingImages.map((img) => img.id));
    const invalidImages = keepImages.filter(
      (img) => !existingImageIds.has(img.id)
    );

    if (invalidImages.length > 0) {
      throw new AppError(
        `Las siguientes imágenes no pertenecen a este espacio: ${invalidImages
          .map((img) => img.id)
          .join(", ")}`,
        HttpStatusCodes.BAD_REQUEST.code
      );
    }
  }
}
