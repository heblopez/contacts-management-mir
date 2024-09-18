const contacts = ['User1', 'User2', 'User3'];
const addButton = document.getElementById('addContact');
const inputNewContact = document.getElementById('contactName');

const contactCounter = document.createElement('div');
contactCounter.textContent = `Total de contactos: ${contacts.length}`;
contactCounter.style.marginBlock = '1rem';
inputNewContact.after(contactCounter);

document.addEventListener('DOMContentLoaded', () => {
  for (let contact of contacts) {
    renderContact(contact);
  }
});

function renderContact(contactName) {
  const contactList = document.getElementById('contactList');

  // Creando el elemento li para el contacto:
  const contactLi = document.createElement('li');
  contactLi.style.listStyle = 'square';

  // Creando el elemento span con el nombre del contacto:
  const contactSpan = document.createElement("span");
  contactSpan.textContent = contactName;
  contactSpan.style.marginRight = '1rem';

  contactLi.appendChild(contactSpan);

  // Creando el botón para editar el contacto:
  const editButton = document.createElement('button');
  editButton.textContent = 'Editar';
  contactLi.appendChild(editButton);

  // Creando el botón para borrar el contacto:
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Eliminar';
  contactLi.appendChild(deleteButton);

  // Agregando los eventos al elemento li:
  deleteButton.addEventListener('click', (ev) => deleteContact(ev, contactName));
  editButton.addEventListener('click', (ev) => editContact(ev, contactName));

  contactList.appendChild(contactLi);
}

addButton.addEventListener('click', () => {
  const contactName = document.getElementById('contactName').value

  if (contactName === '') {
    alert('Por favor, ingresa un nombre de contacto');
    return;
  }

  for (let contact of contacts) {
    if (contact.toLowerCase() === contactName.toLowerCase()) {
      alert('El contacto ya existe');
      return;
    }
  }

  contacts.push(contactName);
  renderContact(contactName);

  // Limpia el campo de texto
  const inputAddContact = document.getElementById('contactName');
  inputAddContact.value = '';

  contactCounter.textContent = `Total de contactos: ${contacts.length}`;
})

function deleteContact(ev, contactName) {
  const contactElementToDelete = ev.target.parentNode;

  // Elimina el contacto de la lista
  contacts.splice(contacts.indexOf(contactName), 1);

  // Elimina el elemento li del DOM
  contactElementToDelete.remove();

  // Actualiza el contador
  contactCounter.textContent = `Total de contactos: ${contacts.length}`;
}

function editContact(ev, contactName) {
  const index = contacts.indexOf(contactName);
  const contactToEdit = ev.target.parentNode;
  // Cambia el texto del botón
  contactToEdit.children[1].textContent = 'Guardar';

  // Extrae el nombre del contacto y crea un input con su value para editarlo
  const input = document.createElement('input');
  input.value = contactName;
  contactToEdit.replaceChild(input, contactToEdit.firstChild);

  // Remplaza el botón de editar por uno nuevo
  const editButton = contactToEdit.children[1];
  const newEditButton = editButton.cloneNode(true);
  newEditButton.addEventListener('click', (ev) => updateContact(ev, index, input.value));
  contactToEdit.replaceChild(newEditButton, editButton);
}

function updateContact(ev, index, newContactName) {
  const contactToEdit = ev.target.parentNode;
  // Cambia el texto del botón
  contactToEdit.children[1].textContent = 'Editar';

  // Crea un span con el nuevo nombre de contacto
  const contactUpdated = document.createElement('span');
  contactUpdated.textContent = newContactName;
  contactUpdated.style.marginRight = '1rem';

  // Actualiza el array de contactos
  contacts[index] = newContactName;
  console.log(contacts);

  // Reemplaza el input por el span con el nuevo contacto
  contactToEdit.replaceChild(contactUpdated, contactToEdit.firstChild);

  // Reemplaza el botón de editar por uno nuevo
  const editButton = contactToEdit.children[1];
  const newEditButton = editButton.cloneNode(true);
  newEditButton.addEventListener('click', (ev) => editContact(ev, newContactName));
  contactToEdit.replaceChild(newEditButton, editButton);
}
