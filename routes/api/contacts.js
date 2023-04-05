const express = require('express');

const contacts = require('../../models/contacts');
const {addSchema, updateSchema} = require('../../utils/validating/contactValidationSchemes')

const HttpError= require('../../helpers/HttpError');

const router = express.Router();

router.get('/', async (req, res, next) => {
try {
  const result = await contacts.getContacts();
  res.json(result);
} catch (error) {
  next(error);
}
});

router.get('/:id', async (req, res, next) => {
  try {
    const {id} =req.params;
    const result =await contacts.getContactById(id);
if(!result) {
  throw new HttpError(404, 'Not found')
}
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const {error} =  addSchema.validate(req.body);
    if(error) {
      throw new HttpError(400, error.message)
    };
    const result = await contacts.addContact(req.body);
    res.status(201).json( result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
      throw new HttpError(404, 'Contact not found')
    };
    res.json({
      message: "Contact deleted"
    })
  } catch (error) {
    next(error);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = updateSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    };
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
      throw new HttpError(404, 'Not found')
    };
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router
