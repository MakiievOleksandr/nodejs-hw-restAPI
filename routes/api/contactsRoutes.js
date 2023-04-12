const express = require('express');
const {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');

const { validateBody } = require('../../utils');

const schemas = require('../../utils/validating/contactValidationSchemes');

const router = express.Router();

router.get('/', getAllContacts);

router.get('/:id', getContact);

router.post('/', validateBody(schemas.addSchema), addContact);

router.put('/:id', validateBody(schemas.addSchema), updateContact);

router.patch(
  '/:id/favorite',
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

router.delete('/:id', deleteContact);

module.exports = router;
