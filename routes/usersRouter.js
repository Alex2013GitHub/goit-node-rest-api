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
userRouter.post("/current", authUser, getCurrent);
userRouter.get("/logout", authUser, logout);
userRouter.get(
  "/",
  authUser,
  validateBody(authSchemas.updateSubscriptionSchema),
  updateSubscription
);

export default userRouter;
