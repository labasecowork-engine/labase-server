import { Router } from "express";
import { editProfileRoutes } from "./features/edit_profile";
import { getProfileRoutes } from "./features/get_profile/presentation/get_profile.routes";
import { listUsersRoutes } from "./features/list_users/presentation/list_users.routes";

export const userRouter = Router();

// Resultado final: PUT users/profile
userRouter.use("/profile", editProfileRoutes);
userRouter.use("/profile", getProfileRoutes);
userRouter.use("/list", listUsersRoutes);

export default userRouter;
