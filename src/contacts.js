const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, '..', 'db', 'contacts.json');

// Función para listar todos los contactos
function listContacts() {
  try {
    // Lee el archivo JSON de contactos
    const data = fs.readFileSync(contactsPath, 'utf-8');
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error('Error al listar contactos:', error);
    return [];
  }
}

// Función para obtener un contacto por su ID
function getContactById(contactId) {
  const contacts = listContacts();
  const contact = contacts.find((c) => c.id === contactId);
  return contact;
}

// Función para eliminar un contacto por su ID
function removeContact(contactId) {
  const contacts = listContacts();
  const updatedContacts = contacts.filter((c) => c.id !== contactId);
  try {
    // Guarda la lista actualizada de contactos en el archivo JSON
    fs.writeFileSync(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return true; // Indica que se eliminó con éxito
  } catch (error) {
    console.error('Error al eliminar contacto:', error);
    return false; // Indica que hubo un error al eliminar
  }
}

// Función para agregar un nuevo contacto
function addContact(name, email, phone) {
  const id = uuidv4();
  const newContact = {
    id: id,
    name,
    email,
    phone,
  };

  const contacts = listContacts();
  contacts.push(newContact);
  try {
    // Guarda la lista actualizada de contactos en el archivo JSON
    fs.writeFileSync(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact; // Retorna el nuevo contacto creado
  } catch (error) {
    console.error('Error al agregar contacto:', error);
    return null; // Indica que hubo un error al agregar
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
