const fs = require('fs')
const path = require('path')

// this path needs to be relative to work with fs
const contactsLocation = path.join(__dirname, 'contacts.json') //'./contacts.json' using "./" is bad

/**
 * should read the contacts at the
 * @contactsLocation path and convert
 * it to a js object
 */
const getContacts = () => {
  const contact = JSON.parse(fs.readFileSync(contactsLocation, {encoding : 'utf-8'}))
  return contact;
}

/**
 * takes a contacts object, converts it to JSON
 * and saves it at the @contactsLocation path
 * @param {Object} contacts contacts object
 */
const saveContacts = (contacts) => {
  const obj_contacts = JSON.stringify(contacts, null, 2) //null, 2 formats the json!!!
  fs.writeFileSync(contactsLocation, obj_contacts)
}

module.exports = {
  contactsLocation,
  getContacts,
  saveContacts
}

