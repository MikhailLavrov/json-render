import { startListenEditButtons } from "./startListenEditButtons.js";

const finishItemEdition = (evt) => {
  const editionButtonOn = document.querySelector('.in-edit-process');

  const changeBtnStatus = () => {
    editionButtonOn.classList.remove('in-edit-process');
    editionButtonOn.textContent = 'Edit';
  };

  const targetEditButton = evt.target;
  const tableRow = targetEditButton.parentNode.parentNode;
  const tableCells = tableRow.querySelectorAll('td');

  if (evt.target === editionButtonOn) {
    changeBtnStatus();

    tableCells.forEach((item) => {
      if (item.hasAttribute('id')) {
        item.removeAttribute('contenteditable');
      };
    });
    
    startListenEditButtons();
  };
}

export {finishItemEdition};
