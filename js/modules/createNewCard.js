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
}

export {createNewCard};
