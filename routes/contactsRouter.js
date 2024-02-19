import express from "express";
import {
  getAllContacts,
  getByIdContact,
  deleteByIdContact,
  addContact,
  updateByIdContact,
  updateStatusContact,
} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../middlewares/validateBody.js";
import { schemas } from "../models/contact.js";
import authUser from "../middlewares/authUser.js";

const contactsRouter = express.Router();

contactsRouter.get("/", authUser, getAllContacts);

contactsRouter.get("/:id", authUser, isValidId, getByIdContact);

contactsRouter.delete("/:id", authUser, isValidId, deleteByIdContact);

contactsRouter.post(
  "/",
  authUser,
  validateBody(schemas.createContactSchema),
  addContact
);

contactsRouter.put(
  "/:id",
  authUser,
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateByIdContact
);

contactsRouter.patch(
  "/:id/favorite",
  authUser,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;
