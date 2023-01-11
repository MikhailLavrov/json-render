const startListenEditButtons = () => {
  setTimeout(() => {
    let editButtons = document.querySelectorAll('#editButton');
    
    editButtons.forEach((button) => button.addEventListener('click', makeItemEditable));
  }, 10);
}

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

// Local utils
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

const stopListenEditButtons = (buttons) => {
  buttons.forEach((button) => {
    button.removeEventListener('click', makeItemEditable);
  })
}

export {startListenEditButtons, finishItemEdition};
