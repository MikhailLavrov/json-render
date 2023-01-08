const table = document.querySelector('tbody');
const templateFragment = document.querySelector('#newRow').content;
const template = templateFragment.querySelector('tr');

const inputForm = document.querySelector('#inputForm');
const nameInput = inputForm.querySelector('#nameInput');
const contactInput = inputForm.querySelector('#contactInput');
const addressInput = inputForm.querySelector('#addressInput');

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
}

export {addNewItem};
