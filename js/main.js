import dataBase from '../data.json' assert { type: "json" };

const table = document.querySelector('tbody');
const templateFragment = document.querySelector('#newRow').content;
const template = templateFragment.querySelector('tr');

// *Utils
// -------------------------------------------------------
const startListenEditButtons = () => {
  editButtons.forEach((button) => {
    button.addEventListener('click', makeItemEditable);
  });
};

const stopListenEditButtons = () => {
  editButtons.forEach((button) => {
    button.removeEventListener('click', makeItemEditable);
  })
};

// *Create new Card with Template
// -------------------------------------------------------
const createNewCard = (obj) => {
  const card = template.cloneNode(true);

  let company = card.querySelector('#company');
  let person = card.querySelector('#person');
  let address = card.querySelector('#address');
  let city = card.querySelector('#city');
  let country = card.querySelector('#country');

  company.textContent = obj.company;
  person.textContent = obj.name;
  address.textContent = obj.address;
  city.textContent = obj.city;
  country.textContent = obj.country;

  return card;
};

// *Render card
// -------------------------------------------------------
const renderList = () => {
  dataBase.forEach(object => {
    let newItem;
    newItem = createNewCard(object);
    table.append(newItem);
  });
};

dataBase.length > 0 ? renderList() : null;

// *Add new Items
// -------------------------------------------------------
const inputForm = document.querySelector('#inputForm');
const nameInput = inputForm.querySelector('#nameInput');
const contactInput = inputForm.querySelector('#contactInput');
const addressInput = inputForm.querySelector('#addressInput');
const addButton = inputForm.querySelector('#addButton');

const addNewItem = () => {
  if (nameInput.value === '' || contactInput.value === '' || addressInput.value === '') {
    return;
  };

  const newCompany = nameInput.value;
  const newContact = contactInput.value;
  const newAddress = addressInput.value;
  const card = template.cloneNode(true);

  let company = card.querySelector('#company');
  let person = card.querySelector('#person');
  let address = card.querySelector('#address');
  let city = card.querySelector('#city');
  let country = card.querySelector('#country');

  company.textContent = newCompany;
  person.textContent = newContact;
  address.textContent = newAddress;
  city.textContent = '';
  country.textContent = '';
  
  table.prepend(card);

  nameInput.value = '';
  contactInput.value = '';
  addressInput.value = '';
};

addButton.addEventListener('click', addNewItem)

// *Delete items
// -------------------------------------------------------
let delButtons = document.querySelectorAll('#delButton');

const deleteItem = (evt) => {
  evt.preventDefault();

  const targetDelButton = evt.target;
  const currentRowItem = targetDelButton.parentNode.parentNode;

  currentRowItem.remove();

  const returnListener = () => {
    let editableButtons = document.querySelectorAll('.in-edit-process');
    if (editableButtons.length === 0) {
      startListenEditButtons();
    };
  };

  setTimeout(returnListener, 50);
};

delButtons.forEach((button) => {
  button.addEventListener('click', deleteItem)
})

// *Edit items
// -------------------------------------------------------
let editButtons = document.querySelectorAll('#editButton');

const makeItemEditable = (evt) => {
  const targetEditButton = evt.target;

  if (targetEditButton.classList.contains('in-edit-process')) {
    return;
  };
  
  const tableRow = targetEditButton.parentNode.parentNode;
  const tableCells = tableRow.querySelectorAll('td');
  const firstCell = tableCells[0];

  tableCells.forEach((item) => {
    if (item.hasAttribute('id')) {
      item.setAttribute('contenteditable', true);
    };
    firstCell.focus();
  });

  const changeBtnStatus = () => {
    if (!targetEditButton.classList.contains('in-edit-process'))
    targetEditButton.textContent = 'Save';
    targetEditButton.classList.add('in-edit-process');
  };

  setTimeout(changeBtnStatus, 50);

  stopListenEditButtons();
};

const finishItemEdition = (evt) => {
  const editionButtonOn = document.querySelector('.in-edit-process');
  const changeBtnStatus = () => {
    editionButtonOn.classList.remove('in-edit-process');
    editionButtonOn.textContent = 'Edit';
  };

  const targetEditButton = evt.target;
  const tableRow = targetEditButton.parentNode.parentNode;
  const tableCells = tableRow.querySelectorAll('td');

  if (evt.target === editionButtonOn) {
    changeBtnStatus();

    tableCells.forEach((item) => {
      if (item.hasAttribute('id')) {
        item.removeAttribute('contenteditable');
      };
    });
    
    startListenEditButtons();
  };
}

startListenEditButtons();

document.addEventListener('click', finishItemEdition)
