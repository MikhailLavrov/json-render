import { createNewCard } from "./createNewCard.js";

const table = document.querySelector('tbody');

const renderList = (items) => {
  items.forEach(item => {
    table.append(createNewCard(item));
  });
}

export {renderList};
