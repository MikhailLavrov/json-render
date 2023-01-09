import { makeItemEditable } from "./makeItemEditable.js";

const startListenEditButtons = () => {
  setTimeout(() => {
    let editButtons = document.querySelectorAll('#editButton');
    
    editButtons.forEach((button) => button.addEventListener('click', makeItemEditable));
  }, 10);
}

export {startListenEditButtons};
