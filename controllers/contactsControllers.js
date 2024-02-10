import HttpError from "../helpers/HttpError.js";
import { Contact } from "../models/contact.js";

export const getAllContacts  = async (_, res, next) => {
  try{
    const result = await Contact.find({}, "name email phone favorite");
  res.json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const addContact = async (req, res, next) => {
  try{
    const result = await Contact.create(req.body);
  res.status(201).json(result);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getByIdContact = async (req, res, next) => {
  try{
    const { id } = req.params;
  const result = await Contact.findById(id);

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
  try{
    const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);

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
  try{
    const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

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
  try{
    const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);

  } catch (error) {
    console.log(error);
    next(error);
  }
};