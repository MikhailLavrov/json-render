import { makeItemEditable } from "./makeItemEditable.js";

const startListenEditButtons = () => {
  let editButtons = document.querySelectorAll('#editButton');
  
  editButtons.forEach((button) => {
    button.addEventListener('click', makeItemEditable);
  });
}

export {startListenEditButtons};
