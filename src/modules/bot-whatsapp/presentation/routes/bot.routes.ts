import { Router } from "express";
import { authenticateToken } from "../../../../middlewares/authenticate_token";
import { startBot } from "../controllers/bot.controller.ts";

const router = Router();


router.post("/start", authenticateToken, startBot);

export default router;
