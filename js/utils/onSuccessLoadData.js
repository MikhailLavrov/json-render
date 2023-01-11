import { createNewCard } from "./createNewCard.js";

const table = document.querySelector('tbody');

const state = {
  items: [],
}

const setState = (items) => {
  state.items = items;
}

const renderList = (items) => {
  items.forEach(item => {
    table.append(createNewCard(item));
  });
}

// *Finally onSuccess event
const onSuccessLoadData = (items) => {
  setState(items);
  renderList(state.items);
}

export {onSuccessLoadData, state};
