import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/usersModel.js";

dotenv.config();
const { SECRET_KEY } = process.env;

const authUser = async (req, res, next) => {
  const { authorization = "" } = req.headers;

  try {
    const [bearer, token] = authorization.split(" ");
    if (bearer !== "Bearer") {
      throw HttpError(401);
    }
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await User.findById(id);

    if (!user && !user.token && token !== user.token) {
      throw HttpError(401);
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authUser;
