import { deleteItem } from '../modules/deleteItem.js';

const startListenDelButtons = () => {
  setTimeout(() => {
  let delButtons = document.querySelectorAll('#delButton');

  delButtons.forEach((button) => button.addEventListener('click', deleteItem));
  }, 10);
}

export {startListenDelButtons};
