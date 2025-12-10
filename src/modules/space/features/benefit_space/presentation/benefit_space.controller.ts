import { Request, Response } from "express";
import { BenefitService } from "./benefit_space.service";
import { CreateBenefitSchema } from "../domain/benefit_space.schema";
import { UpdateBenefitSchema } from "../domain/update_benefit_space.schema";
import { buildHttpResponse } from "../../../../../utils/";
import {
  handleServerError,
  handleZodError,
} from "../../../../../utils/error_handler";
import { HttpStatusCodes } from "../../../../../constants/http_status_codes";
import { ZodError } from "zod";
import { AuthenticatedRequest } from "../../../../../middlewares/authenticate_token";

/**
 * Un solo controlador para las tres operaciones CRUD básicas de Beneficios.
 *  - create  -> POST   /benefits
 *  - list    -> GET    /benefits
 *  - update  -> PUT    /benefits/:id
 *  - delete  -> DELETE    /benefits/:id
 */
export class BenefitController {
  private readonly service = new BenefitService();

  list = async (req: Request, res: Response) => {
    try {
      const benefits = await this.service.list();
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Benefits list",
            req.path,
            { benefits }
          )
        );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  };

  create = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const dto = CreateBenefitSchema.parse(req.body);
      const created = await this.service.create(dto);
      return res
        .status(HttpStatusCodes.CREATED.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.CREATED.code,
            "Benefit created",
            req.path,
            { benefit: created }
          )
        );
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  };

  update = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      const dto = UpdateBenefitSchema.parse(req.body);
      const updated = await this.service.update(id, dto);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Benefit updated",
            req.path,
            { benefit: updated }
          )
        );
    } catch (error) {
      if (error instanceof ZodError) {
        const err = handleZodError(error, req);
        return res.status(err.status).json(err);
      }
      return handleServerError(res, req, error);
    }
  };

  delete = async (req: AuthenticatedRequest, res: Response) => {
    try {
      const { id } = req.params;
      await this.service.delete(id);
      return res
        .status(HttpStatusCodes.OK.code)
        .json(
          buildHttpResponse(
            HttpStatusCodes.OK.code,
            "Benefit deleted",
            req.path
          )
        );
    } catch (error) {
      return handleServerError(res, req, error);
    }
  };
}
