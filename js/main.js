const DATA_URL = 'data.json';
const addButton = document.querySelector('#addButton');
const table = document.querySelector('tbody');
const templateFragment = document.querySelector('#newRow').content;
const template = templateFragment.querySelector('tr');
const inputForm = document.querySelector('#inputForm');
const companyInput = inputForm.querySelector('#companyInput');
const contactInput = inputForm.querySelector('#contactInput');
const addressInput = inputForm.querySelector('#addressInput');
const cityInput = inputForm.querySelector('#cityInput');
const countryInput = inputForm.querySelector('#countryInput');

window.addEventListener('DOMContentLoaded', () => {

  // *Получаем данные
  const getData = (onSuccess) => {
    fetch(DATA_URL)
    .then(response => response.ok ? response.json() : console.log(`${response.status} — ${response.statusText}`))
    .then(items => onSuccess(items))
    .catch(() => alert('Error :('))
  };

  // * Рендер
  const renderList = (items) => {
    items.forEach(item => {
      table.append(createNewItem(item));
    });
  }

  const renderItem = (item) => {
    table.prepend(item);
  }

  // *Шаблон создания элемента
  const createNewItem = (obj) => {
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

  // *Добавляем, рендерим и слушаем новый элемент (по кнопке +)
  const addNewItem = () => {
    const newCompany = companyInput.value;
    const newContact = contactInput.value;
    const newAddress = addressInput.value;
    const newCity = cityInput.value;
    const newCountry = countryInput.value;
    const card = template.cloneNode(true);
    
    if (companyInput.value === '' || 
        contactInput.value === '' || 
        addressInput.value === '' ||
        cityInput.value === '' ||
        countryInput.value === '') {
      return;
    };
  
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
    
    renderItem(card);
    startListenDelButtons();
    startListenEditButtons();
  
    companyInput.value = '';
    contactInput.value = '';
    addressInput.value = '';
    cityInput.value = '';
    countryInput.value = '';
  };

  // * Удаление
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

  const startListenDelButtons = () => {
    setTimeout(() => {
    let delButtons = document.querySelectorAll('#delButton');
  
    delButtons.forEach((button) => button.addEventListener('click', deleteItem));
    }, 10);
  };

  // * Изменение
  const startListenEditButtons = () => {
    setTimeout(() => {
      let editButtons = document.querySelectorAll('#editButton');
      
      editButtons.forEach((button) => button.addEventListener('click', makeItemEditable));
    }, 10);
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
  };
  
  const makeItemEditable = (evt) => {
    let targetEditButton = evt.target;
    let editButtons = document.querySelectorAll('#editButton');
  
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
  
    const changeEditBtnStatus = () => {
      if (!targetEditButton.classList.contains('in-edit-process'))
      targetEditButton.textContent = 'Save';
      targetEditButton.classList.add('in-edit-process');
    };
  
    setTimeout(changeEditBtnStatus, 50);
  
    stopListenEditButtons(editButtons);
  };
  
  const stopListenEditButtons = (buttons) => {
    buttons.forEach((button) => {
      button.removeEventListener('click', makeItemEditable);
    })
  };

  // *Data Render
  getData(renderList);

  // *Add-New Listener
  addButton.addEventListener('click', addNewItem);

  // *Delete Listener
  startListenDelButtons();

  // *Edit Listener
  startListenEditButtons();
  document.addEventListener('click', finishItemEdition);
});
