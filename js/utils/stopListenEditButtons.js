import { makeItemEditable } from "./makeItemEditable.js";

const stopListenEditButtons = (buttons) => {
  buttons.forEach((button) => {
    button.removeEventListener('click', makeItemEditable);
  })
}

export {stopListenEditButtons};
