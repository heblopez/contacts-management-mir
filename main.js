const addButton = document.getElementById('addContact');

function addContact(contactName) {
  const contactList = document.getElementById('contactList');
  const contactItem = document.createElement('div');

  const contactNameP = document.createElement("p");
  contactNameP.textContent = contactName;
  contactItem.appendChild(contactNameP);
  contactList.appendChild(contactItem);

  const editButton = document.createElement('button');
  editButton.className = 'editButton';

  const deleteButton = document.createElement('button');
  editButton.textContent = 'Editar';
  deleteButton.textContent = 'Eliminar';
  contactItem.appendChild(editButton);
  contactItem.appendChild(deleteButton);
  deleteButton.addEventListener('click', deleteContact);
  editButton.addEventListener('click', editContact);
}

addButton.addEventListener('click', () => {
  const contactName = document.getElementById('contactName').value;
  addContact(contactName);
  const inputAddContact = document.getElementById('contactName');
  inputAddContact.value = '';
})

function deleteContact(ev) {
  const contactToDelete = ev.target.parentNode;
  contactToDelete.remove();
}

function editContact(ev) {
  const contactToEdit = ev.target.parentNode;
  contactToEdit.children[1].textContent = 'Guardar';

  const editButton = contactToEdit.children[1];

  const contactName = contactToEdit.children[0].textContent ;
  console.log(contactName);

  const input = document.createElement('input');
  input.value = contactName;
  contactToEdit.replaceChild(input, contactToEdit.firstChild);
  editButton.removeEventListener('click', editContact);
  editButton.addEventListener('click', updateContact);
}

function updateContact(ev) {
  const contactToEdit = ev.target.parentNode;
  const editButton = contactToEdit.children[1];

  const contactName = contactToEdit.children[0].value;
  const contactUpdated = document.createElement('p');
  contactUpdated.textContent = contactName;
  contactToEdit.replaceChild(contactUpdated, contactToEdit.firstChild);
  contactToEdit.children[1].textContent = 'Editar';

  editButton.removeEventListener('click', updateContact);
  editButton.addEventListener('click', editContact);
}
