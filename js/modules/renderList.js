import dataBase from '../../data.json' assert { type: "json" };
import { createNewCard } from "./createNewCard.js";

const table = document.querySelector('tbody');

const renderList = () => {
  dataBase.forEach(object => {
    let newItem;
    newItem = createNewCard(object);
    table.append(newItem);
  });
}

export {renderList};
