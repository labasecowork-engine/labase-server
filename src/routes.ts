import { Router } from "express";

import { botRoutes } from "./modules/bot-web/presentation/routes/bot.routes";
import { authRouter } from "./modules/auth/auth.routes";
import { spaceRouter } from "./modules/space";
import { reservationRouter } from "./modules/reservation";
import { userRouter } from "./modules/user";
import { inquiryRoutes } from "./modules/inquiry/presentation/inquiry.routes";
import { bulkEmailRoutes } from "./modules/bulk-email/presentation/bulk-email.routes";
import calendarRouter from "./modules/calendar/index";
import { paymentRoutes } from "./modules/payment";
import articleRoutes from "./modules/content/article/";
import articleCategoryRouter from "./modules/content/category/";
import { attendanceRouter } from "./modules/attendance";
import { employeeRouter } from "./modules/employee";
import { newsletterRouter } from "./modules/newsletter";
import productRouter from "./modules/inventory";
import { workareaRouter } from "./modules/workarea";
import { companyRouter } from "./modules/company";
import chatbotwhatsapp from "./modules/bot-whatsapp/presentation/routes/bot.routes";
import visitorRouter from "./modules/visitor";
import reminderRouter from "./modules/reminders/features";
import communicationRouter from "./modules/communication";

const router = Router();
const API_VERSION = "/api/v1";

router.use(`${API_VERSION}/articles/categories`, articleCategoryRouter);
router.use(`${API_VERSION}/articles`, articleRoutes);
router.use(`${API_VERSION}/chatbot`, botRoutes);
router.use(`${API_VERSION}/chatbotwhatsapp`, chatbotwhatsapp);

router.use(`${API_VERSION}/auth`, authRouter);
router.use(`${API_VERSION}/users`, userRouter);
router.use(`${API_VERSION}/spaces`, spaceRouter);

router.use(`${API_VERSION}/reservations`, reservationRouter);

router.use(`${API_VERSION}/newsletter`, newsletterRouter);
router.use(`${API_VERSION}/bulk_email`, bulkEmailRoutes);
router.use(`${API_VERSION}/calendar`, calendarRouter);
router.use(`${API_VERSION}/form`, inquiryRoutes);
router.use(`${API_VERSION}/payment`, paymentRoutes);

router.use(`${API_VERSION}/attendance`, attendanceRouter);
router.use(`${API_VERSION}/`, employeeRouter);

router.use(`${API_VERSION}/inventory`, productRouter);

router.use(`${API_VERSION}/`, workareaRouter);
router.use(`${API_VERSION}/`, companyRouter);

router.use(`${API_VERSION}/visitors`, visitorRouter);
router.use(`${API_VERSION}/reminders`, reminderRouter);
router.use(`${API_VERSION}/communication`, communicationRouter);

export default router;
