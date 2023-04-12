const express = require('express');
const {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:id', getContact);

router.post('/', addContact);

router.put('/:id', updateContact);

router.patch('/:id/favorite', updateStatusContact);

router.delete('/:id', deleteContact);

module.exports = router;
