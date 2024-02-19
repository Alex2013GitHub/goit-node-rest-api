import express from "express";
import { authSchemas } from "../models/usersModel.js";
import authUser from "../middlewares/authUser.js";
import {
  getCurrent,
  login,
  logout,
  register,
  updateSubscription,
} from "../controllers/userControllers.js";
import validateBody from "../middlewares/validateBody.js";

const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(authSchemas.registerSchema),
  register
);
userRouter.post("/login", validateBody(authSchemas.loginSchema), login);
userRouter.get("/current", authUser, getCurrent);
userRouter.post("/logout", authUser, logout);
userRouter.patch(
  "/",
  authUser,
  validateBody(authSchemas.updateSubscriptionSchema),
  updateSubscription
);

export default userRouter;
