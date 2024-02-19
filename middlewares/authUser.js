import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";

dotenv.config();

const authUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [type, token] = authorization.split(" ");

  if (type !== "Bearer") {
    next(HttpError(401));
  }

  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);

    if (!user || !user.token || user.token !== token) {
      next(HttpError(401));
    }

    req.user = user;
    next();
  } catch {
    next(HttpError(401));
  }
};

export default authUser;
