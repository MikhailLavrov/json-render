import { startListenEditButtons } from "../utils/startListenEditButtons.js";

const deleteItem = (evt) => {
  evt.preventDefault();

  const targetDelButton = evt.target;
  const currentRowItem = targetDelButton.parentNode.parentNode;

  currentRowItem.remove();

  const returnListener = () => {
    let editableButtons = document.querySelectorAll('.in-edit-process');
    if (editableButtons.length === 0) {
      startListenEditButtons();
    };
  };

  setTimeout(returnListener, 50);
}

export {deleteItem};
