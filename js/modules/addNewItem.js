const table = document.querySelector('tbody');
const templateFragment = document.querySelector('#newRow').content;
const template = templateFragment.querySelector('tr');

const inputForm = document.querySelector('#inputForm');
const companyInput = inputForm.querySelector('#companyInput');
const contactInput = inputForm.querySelector('#contactInput');
const addressInput = inputForm.querySelector('#addressInput');
const cityInput = inputForm.querySelector('#cityInput');
const countryInput = inputForm.querySelector('#countryInput');

const addNewItem = () => {
  if (companyInput.value === '' || 
      contactInput.value === '' || 
      addressInput.value === '' ||
      cityInput.value === '' ||
      countryInput.value === '') {
    return;
  };

  const newCompany = companyInput.value;
  const newContact = contactInput.value;
  const newAddress = addressInput.value;
  const newCity = cityInput.value;
  const newCountry = countryInput.value;
  const card = template.cloneNode(true);

  let company = card.querySelector('#company');
  let person = card.querySelector('#person');
  let address = card.querySelector('#address');
  let city = card.querySelector('#city');
  let country = card.querySelector('#country');

  company.textContent = newCompany;
  person.textContent = newContact;
  address.textContent = newAddress;
  city.textContent = newCity;
  country.textContent = newCountry;
  
  table.prepend(card);

  companyInput.value = '';
  contactInput.value = '';
  addressInput.value = '';
  cityInput.value = '';
  countryInput.value = '';
}

export {addNewItem};
