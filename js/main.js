import dataBase from '../data.json' assert { type: "json" };
import { renderList } from './modules/renderList.js';
import { startListenEditButtons } from './utils/startListenEditButtons.js';
import { addNewItem } from './modules/addNewItem.js';
import { finishItemEdition } from './utils/finishItemEdition.js';
import { startListenDelButtons } from './utils/startListenDelButtons.js';

dataBase.length > 0 ? renderList() : null;

// *Add new Items
// -------------------------------------------------------
const addButton = document.querySelector('#addButton');
addButton.addEventListener('click', addNewItem)

// *Delete items
// -------------------------------------------------------
startListenDelButtons();

// *Edit items
// -------------------------------------------------------
startListenEditButtons();
document.addEventListener('click', finishItemEdition)
