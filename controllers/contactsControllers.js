import {listContacts,
    getById,
    addContact,
    removeContact,
    updateById,} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";
import ctrlWrap from "../helpers/ctrlWrap.js";

export const getAllContacts = ctrlWrap(async(_, res) => {
    const result = await listContacts();
    res.status(200).json(result);
});

export const getOneContact = ctrlWrap(async(req, res) => {
    const {id} = req.params;
    const result = await getById(id);

    if(!result){
        throw HttpError(404, "Not Found");
    }

    res.status(200).json(result);
});

export const deleteContact = ctrlWrap(async(req, res) => {
    const {id} = req.params;
    const result = await removeContact(id);

    if(!result){
        throw HttpError(404, "Not Found");
    }

    res.status(200).json(result);
});

export const createContact = ctrlWrap(async(req, res) => {
    const result = await addContact(req.body);

    if(!result){
        throw HttpError(404, "Not Found");
    }

    res.status(201).json(result)
});

export const updateContact = ctrlWrap(async(req, res) => {
    const {id} = req.params;
    const result = await updateById(id, req.body);

    if(!result){
        throw HttpError(404, "Not Found");
    }

    res.status(200).json(result);
});
