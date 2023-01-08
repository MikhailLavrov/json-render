import { deleteItem } from '../modules/deleteItem.js';

const startListenDelButtons = () => {
  let delButtons = document.querySelectorAll('#delButton');

  delButtons.forEach((button) => {
    button.addEventListener('click', deleteItem)
  })
}

export {startListenDelButtons};
