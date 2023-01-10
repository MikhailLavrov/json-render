import { startListenEditButtons } from './utils/startListenEditButtons.js';
import { addNewItem } from './modules/addNewItem.js';
import { finishItemEdition } from './utils/finishItemEdition.js';
import { startListenDelButtons } from './utils/startListenDelButtons.js';
import { onSuccessLoadData } from './utils/onSuccessLoadData.js';
import { getData } from './modules/getData.js';

window.addEventListener('DOMContentLoaded', () => {

  const addButton = document.querySelector('#addButton');

  getData(onSuccessLoadData);

  // *Add new Items
  addButton.addEventListener('click', addNewItem);

  // *Delete items
  startListenDelButtons();

  // *Edit items
  startListenEditButtons();
  document.addEventListener('click', finishItemEdition);
    
});
