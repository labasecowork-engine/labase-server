import { Router } from "express";
import { subscribeRoute, listSubscribeRoute } from "./features/";

export const newsletterRouter = Router();

newsletterRouter.use("/", subscribeRoute);
newsletterRouter.use("/", listSubscribeRoute);

export default newsletterRouter;
