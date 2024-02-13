import express  from "express";
import { getAllContacts , getByIdContact, deleteByIdContact, addContact, updateByIdContact, updateStatusContact,} from "../controllers/contactsControllers.js";
import isValidId from "../middlewares/isValidId.js";
import validateBody from "../middlewares/validateBody.js";
import { schemas } from "../models/contact.js";

const contactsRouter = express.Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", isValidId, getByIdContact);

contactsRouter.delete("/:id", isValidId, deleteByIdContact);

contactsRouter.post("/", validateBody(schemas.createContactSchema), addContact);

contactsRouter.put(
  "/:id",
  isValidId,
  validateBody(schemas.updateContactSchema),
  updateByIdContact
);

contactsRouter.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

export default contactsRouter;