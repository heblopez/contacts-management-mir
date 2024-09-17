const contacts = [];
const addButton = document.getElementById('addContact');
const inputNewContact = document.getElementById('contactName');

const contactCounter = document.createElement('div');
contactCounter.textContent = `Total de contactos: ${contacts.length}`;
contactCounter.style.marginBlock = '1rem';
inputNewContact.after(contactCounter);

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
  deleteButton.addEventListener('click', deleteContact);
  editButton.addEventListener('click', editContact);

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

function deleteContact(ev) {
  const contactElementToDelete = ev.target.parentNode;
  const contactToDelete = contactElementToDelete.firstChild.textContent;

  // Elimina el contacto de la lista
  contacts.splice(contacts.indexOf(contactToDelete), 1);

  // Elimina el elemento li del DOM
  contactElementToDelete.remove();

  // Actualiza el contador
  contactCounter.textContent = `Total de contactos: ${contacts.length}`;
}

function editContact(ev) {
  const contactToEdit = ev.target.parentNode;
  // Cambia el texto del botón
  contactToEdit.children[1].textContent = 'Guardar';

  // Extrae el nombre del contacto y crea un input con su value para editarlo
  const contactName = contactToEdit.children[0].textContent ;
  const input = document.createElement('input');
  input.value = contactName;
  contactToEdit.replaceChild(input, contactToEdit.firstChild);

  // Actualiza
  const editButton = contactToEdit.children[1];
  editButton.removeEventListener('click', editContact);
  editButton.addEventListener('click', updateContact);
}

function updateContact(ev) {
  const contactToEdit = ev.target.parentNode;
  // Cambia el texto del botón
  contactToEdit.children[1].textContent = 'Editar';

  // Crea un span con el nuevo nombre de contacto
  const contactName = contactToEdit.children[0].value;
  const contactUpdated = document.createElement('span');
  contactUpdated.textContent = contactName;

  // Reemplaza el input por el span con el nuevo contacto
  contactToEdit.replaceChild(contactUpdated, contactToEdit.firstChild);

  // Actualiza el evento del botón
  const editButton = contactToEdit.children[1];
  editButton.removeEventListener('click', updateContact);
  editButton.addEventListener('click', editContact);
}
