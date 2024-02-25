import express from "express";
import { authSchemas } from "../models/usersModel.js";
import {
  getCurrent,
  login,
  logout,
  register,
  resendVerifyEmail,
  updateAvatar,
  updateSubscription,
  verifyEmail,
} from "../controllers/userControllers.js";
import validateBody from "../middlewares/validateBody.js";
import authUser from "../middlewares/authUser.js";
import { upload } from "../middlewares/upload.js";

export const userRouter = express.Router();

userRouter.post(
  "/register",
  validateBody(authSchemas.registerSchema),
  register
);

userRouter.get("/verify/:verificationToken", verifyEmail);
userRouter.post(
  "/verify",
  validateBody(authSchemas.verificationEmailSchema),
  resendVerifyEmail
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
userRouter.patch("/avatars", authUser, upload.single("avatar"), updateAvatar);
