const fs = require('fs/promises')
const path = require('path')
const {nanoid} = require('nanoid')

const contactPath = path.join(__dirname, './contacts.json')

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  return JSON.parse(data)
}

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
}

const removeContact = async (contactId) => {
  const contacts = await listContacts()
  const idx = contacts.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null
  }
  const [result ] = contacts.splice(idx, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
return result
}

const addContact = async ({ name, email, phone}) => { 
  const contacts = await listContacts()
  const newContact = {
    id: nanoid(), name, email, phone
  }
  contacts.push(newContact)
  await fs.writeFile(contactPath, JSON.stringify(contacts, null, 2))
  return newContact
}

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(item => item.id === contactId);
  if(idx === -1) {
    return null
  }
  contacts[idx] = {contactId, ...body};
  await fs.writeFile(contactPath, JSON.stringify(contacts, null , 2))
  return contacts[idx]
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
