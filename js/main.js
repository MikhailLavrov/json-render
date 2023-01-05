import dataBase from './data.json' assert { type: "json" };

const table = document.querySelector('tbody');
const templateFragment = document.querySelector('#newRow').content;
const template = templateFragment.querySelector('tr');
const mainCheckButton = document.querySelector('#checkAll');

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

const checkBoxes = document.querySelectorAll('#check');

const addChecked = () => {
  checkBoxes.forEach((button) => {
    button.setAttribute('checked', true);
  });
};

const removeChecked = () => {
  checkBoxes.forEach((button) => {
    button.removeAttribute('checked');
  });
};

mainCheckButton.addEventListener('click', addChecked);

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
