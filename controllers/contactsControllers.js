import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

export const getAllContacts = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { page = 1, limit = 20, favorite } = req.query;
    const skip = (page - 1) * limit;

    const isFavorite = favorite === "true";
    const result = await Contact.find(
      { owner, favorite: isFavorite },
      "-createdAt -updatedAt",
      {
        skip,
        limit,
      }
    ).populate("owner", "email");
    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getByIdContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findById(id).where("owner").equals(owner);

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteByIdContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findByIdAndDelete(id)
      .where("owner")
      .equals(owner);

    if (!result) {
      throw HttpError(404, "Not Found");
    }

    res.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateByIdContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
      .where("owner")
      .equals(owner);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateStatusContact = async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true })
      .where("owner")
      .equals(owner);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
