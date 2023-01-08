import { makeItemEditable } from "./makeItemEditable.js";

const stopListenEditButtons = () => {
  let editButtons = document.querySelectorAll('#editButton');
  
  editButtons.forEach((button) => {
    button.removeEventListener('click', makeItemEditable);
  })
}

export {stopListenEditButtons};
