const HttpError = require('../helpers/HttpError');

const { ctrlsWrapper } = require('../utils');

const Contact = require('../models/contact');

const getAllContacts = async (__, res) => {
  const result = await Contact.find();
  res.json(result);
};

const getContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw new HttpError(404, 'Not found');
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, 'Not found');
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw new HttpError(404, 'Not found');
  }
  res.json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw new HttpError(404, 'Contact not found');
  }
  res.json({
    message: 'Contact deleted',
  });
};

module.exports = {
  getAllContacts: ctrlsWrapper(getAllContacts),
  getContact: ctrlsWrapper(getContact),
  addContact: ctrlsWrapper(addContact),
  updateContact: ctrlsWrapper(updateContact),
  updateStatusContact: ctrlsWrapper(updateStatusContact),
  deleteContact: ctrlsWrapper(deleteContact),
};
