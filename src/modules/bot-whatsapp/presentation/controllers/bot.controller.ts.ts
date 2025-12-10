import { Response } from "express";
import { HttpStatusCodes } from "../../../../constants/http_status_codes";
import { asyncHandler } from "../../../../middlewares/async_handler";
import { ChatbotService } from "../services/bot.service";
import { buildHttpResponse } from "../../../../utils";

const singleton = new ChatbotService();

export const startBot = asyncHandler(async (req: any, res: Response) => {
  singleton.init();
  return res
    .status(HttpStatusCodes.OK.code)
    .json(
      buildHttpResponse(
        HttpStatusCodes.OK.code,
        "WhatsApp bot iniciado",
        req?.originalUrl ?? "/api/v1/bot-whatsapp/start"
      )
    );
});
