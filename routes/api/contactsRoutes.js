const express = require('express');
const {
  getAllContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
  updateStatusContact,
} = require('../../controllers/contactsControllers');

const { isValidId, authenticate } = require('../../helpers/middleWares');

const { validateBody } = require('../../utils');

const schemas = require('../../utils/validating/contactValidationSchemes');

const router = express.Router();

router.get('/', authenticate, getAllContacts);

router.get('/:id', authenticate, isValidId, getContact);

router.post('/', authenticate, validateBody(schemas.addSchema), addContact);

router.put(
  '/:id',
  authenticate,
  isValidId,
  validateBody(schemas.addSchema),
  updateContact
);

router.patch(
  '/:id/favorite',
  authenticate,
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  updateStatusContact
);

router.delete('/:id', authenticate, isValidId, deleteContact);

module.exports = router;
