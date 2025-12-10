import { Router } from "express";
import sendMessageRoutes from "./features/send_message/presentation/send_message.routes";
import getMessagesRoutes from "./features/get_messages/presentation/get_messages.routes";

const router = Router();

router.use("/", sendMessageRoutes);
router.use("/", getMessagesRoutes);

export default router;