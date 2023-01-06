import dataBase from '../data.json' assert { type: "json" };

const table = document.querySelector('tbody');
const templateFragment = document.querySelector('#newRow').content;
const template = templateFragment.querySelector('tr');

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

const renderList = () => {
  dataBase.forEach(object => {
    let newItem;
    newItem = createNewCard(object);
    table.append(newItem);
  });
};

dataBase.length > 0 ? renderList() : null;

const inputForm = document.querySelector('#inputForm');
const nameInput = inputForm.querySelector('#nameInput');
const contactInput = inputForm.querySelector('#contactInput');
const addressInput = inputForm.querySelector('#addressInput');
const addButton = inputForm.querySelector('#addButton');

const addFromInputs = () => {
  if (nameInput.value === '' || contactInput.value === '' || addressInput.value === '') {
    return;
  }

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

addButton.addEventListener('click', addFromInputs)

// Delete items

let delButtons = document.querySelectorAll('#delButton');

const deleteItem = (evt) => {
  evt.preventDefault();
  evt.target.parentNode.parentNode.remove();
}

delButtons.forEach((button) => {
  button.addEventListener('click', deleteItem)
})

// Edit items

let editButtons = document.querySelectorAll('#editButton');

const makeItemEditable = (evt) => {
  evt.preventDefault();
  const editButton = evt.target;
  const tableRow = editButton.parentNode.parentNode;
  const tableCells = tableRow.querySelectorAll('td');
  const firstCell = tableCells[0];

  tableCells.forEach((item) => {
    if (item.hasAttribute('id')) {
      item.setAttribute('contenteditable', true);
    };
    firstCell.focus();
  });

  editButton.textContent = 'Save';
  editButton.classList.add('in-edit-process');
}

editButtons.forEach((button) => {
  button.addEventListener('click', makeItemEditable)
})
