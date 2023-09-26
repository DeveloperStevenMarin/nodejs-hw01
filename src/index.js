const express = require('express');
const app = express();
const contacts = require('./contacts');
const yargs = require('yargs'); // Importa yargs

// Middleware para manejar JSON en las solicitudes
app.use(express.json());

const argv = yargs(process.argv.slice(2)) // Ignora los primeros 2 argumentos (node index.js)
  .command('list', 'List all contacts')
  .command('get <id>', 'Get contact by ID')
  .command('add <name> <email> <phone>', 'Add a new contact')
  .command('remove <id>', 'Remove contact by ID')
  .help().argv;

const command = argv._[0];

switch (command) {
  case 'list':
    const contactsList = contacts.listContacts();
    console.log(contactsList);
    break;

  case 'get':
    const contactId = argv.id;
    const contact = contacts.getContactById(contactId);
    if (!contact) {
      console.error('Contact not found');
    } else {
      console.log(contact);
    }
    break;

  case 'add':
    const { name, email, phone } = argv;
    const newContact = contacts.addContact(name, email, phone);
    console.log(newContact);
    break;

  case 'remove':
    const removed = contacts.removeContact(argv.id);
    if (removed) {
      console.log('Contact removed');
    } else {
      console.error('Contact not found');
    }
    break;

  default:
    console.error('Unknown command. Use "--help" for available commands.');
}

// Resto de tu código de Express (rutas, servidor, etc.)

// Inicia el servidor
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
