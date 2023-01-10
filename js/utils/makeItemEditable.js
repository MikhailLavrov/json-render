import { stopListenEditButtons } from "./stopListenEditButtons.js";

const makeItemEditable = (evt) => {
  let targetEditButton = evt.target;
  let editButtons = document.querySelectorAll('#editButton');

  if (targetEditButton.classList.contains('in-edit-process')) {
    return;
  };
  
  const tableRow = targetEditButton.parentNode.parentNode;
  const tableCells = tableRow.querySelectorAll('td');
  const firstCell = tableCells[0];

  tableCells.forEach((item) => {
    if (item.hasAttribute('id')) {
      item.setAttribute('contenteditable', true);
    };
    firstCell.focus();
  });

  const changeEditBtnStatus = () => {
    if (!targetEditButton.classList.contains('in-edit-process'))
    targetEditButton.textContent = 'Save';
    targetEditButton.classList.add('in-edit-process');
  };

  setTimeout(changeEditBtnStatus, 50);

  stopListenEditButtons(editButtons);
}

export {makeItemEditable};
