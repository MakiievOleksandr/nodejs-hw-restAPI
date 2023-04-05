const fs = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const contactPath = path.join(__dirname, './contacts.json')
const HttpError = require('../helpers/HttpError')

const getContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await getContacts();
  const result = contacts.find((item) => String(item.id) === String(contactId));
  if(!result) {
    throw new HttpError(404, 'ID not found')
  }
  return result;
}

const removeContact = async (contactId) => {
  const contacts = await getContacts()
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null
  }
  const [result ] = contacts.splice(idx, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2));
  if(!idx) {
    throw new HttpError(404, 'ID not found!')
}
return result
}

const addContact = async ({ name, email, phone}) => { 
  const contacts = await getContacts()
  const newContact = {
    id: crypto.randomUUID(), name, email, phone
  }
  contacts.push(newContact)
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await getContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if(idx === -1) {
    return null
  }
  contacts[idx] = {contactId, ...body};
  await fs.writeFile(contactPath, JSON.stringify(contacts, null , 2));
  if(!contactId) {
    throw new HttpError(404, 'ID not found!')
}
  return contacts[idx]
}

module.exports = {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
