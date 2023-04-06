const contacts = require('../models/contactsServices');
const HttpError= require('../helpers/HttpError');
const {addSchema, updateSchema} = require('../utils/validating/contactValidationSchemes')
const {ctrlsWrapper} = require('../utils')


const getAllContacts = async (req, res) => {
      const result = await contacts.getContacts();
      res.json(result);
    }

    const getContact = async (req, res) => {
          const {id} =req.params;
          const result =await contacts.getContactById(id);
      if(!result) {
        throw new HttpError(404, 'Not found')
      }
          res.json(result);
      }

      const addContact = async (req, res) => {
          const {error} =  addSchema.validate(req.body);
          if(error) {
            throw new HttpError(400, error.message)
          };
          const result = await contacts.addContact(req.body);
          res.status(201).json( result);
      }

      const updateContact =  async (req, res) => {
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
      }

      const deleteContact =  async (req, res) => {
          const {id} = req.params;
          const result = await contacts.removeContact(id);
          if(!result) {
            throw new HttpError(404, 'Contact not found')
          };
          res.json({
            message: "Contact deleted"
          })
      }


    module.exports = {
        getAllContacts: ctrlsWrapper(getAllContacts),
        getContact: ctrlsWrapper(getContact),
        addContact: ctrlsWrapper(addContact),
        updateContact: ctrlsWrapper(updateContact),
        deleteContact: ctrlsWrapper(deleteContact)
    }