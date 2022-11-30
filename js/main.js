//* main
const form = document.querySelector('#form');
const taskInput = document.querySelector('#task-input');
const taskList = document.querySelector('#tasksList');
const headerButton = document.querySelector('#headerButton');
//* badges
const doneCountBadge = document.querySelector('#doneCountBadge');
const removedCountBadge = document.querySelector('#removedCountBadge');
//* nav panel (pills)
const navPanel = document.querySelector('#navPanel');
const navLinks = document.querySelectorAll('.nav-link');
const actualList = document.querySelector('#actualList');
const doneList = document.querySelector('#doneList');
const deletedList = document.querySelector('#deletedList');
// * templates
const emptyList = `
      <li class="p-4 d-flex flex-column align-items-center gap-1 list-group-item bg-light empty-list" id="emptyList">
        <svg>
          <use href="./img/empty.svg#emptySvg"></use>
        </svg>
        <span class="fs-5">Empty</span>
      </li>`;

// const newTaskTemplateFragment = document.querySelector('#new-task-template').content; // Находим фрагмент с содержимым темплейта
// const newTaskTemplate = newTaskTemplateFragment.querySelector('li'); // В фрагменте находим нужный элемент
// const newTaskElement = newTaskTemplate.cloneNode(true); // Клонируем элемент со всеми "внутренностями"
// const fragment = document.createDocumentFragment();
// fragment.appendChild(newTaskElement);

let tasks = [];
let removedTasks = [];

if (localStorage.getItem('tasks')) {
  tasks = JSON.parse(localStorage.getItem('tasks'));
  tasks.forEach(task => renderTask(task));
};

if (localStorage.getItem('removedTasks')) {
  removedTasks = JSON.parse(localStorage.getItem('removedTasks'));
  removedTasks.length !== 0 ? removedCountBadge.textContent = removedTasks.length : null;

  if (deletedList.classList.contains('active')) {
    removedTasks.forEach(task => renderTask(task));
  }
};

checkIsEmpty();

form.addEventListener('submit', addTask);
taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', doneTask);
navPanel.addEventListener('click', makeNavLinkActive);
headerButton.addEventListener('click', () => setTimeout(() => taskInput.focus(), 0));

//* main funcs (add, done, remove)
function addTask(evt) {
  evt.preventDefault();

  const taskText = taskInput.value;

  let newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  if (!taskInput.value) return;
  
  renderTask(newTask);

  tasks.push(newTask);
        
  taskInput.value = '';
  taskInput.focus();

  checkIsEmpty();
  saveTasksToStorage();
};

function doneTask(evt) {
  if (evt.target.dataset.action !== 'done') return;
  const parentItem = evt.target.closest('li');
  const doneText = parentItem.querySelector('span');

  let id = Number(parentItem.id);
  const task = tasks.find((task) => task.id === id);
  task.done = !task.done;

  doneText.classList.toggle('done-text');
  parentItem.classList.toggle('done-item');

  checkIsEmpty();
  saveTasksToStorage();
  getDoneCount();
};

function removeTask(evt) {
  if (evt.target.dataset.action !== "delete") return;

  const parentNode = evt.target.closest('li');

  let id = Number(parentNode.id);

  // delete task from array
  tasks = tasks.filter(function(task) {
    if (task.id === id) {
      getRemovedCount(task);
      return false;
    } else {
      return true;
    };
  });

  parentNode.remove();
  getDoneCount();
  checkIsEmpty();
  saveTasksToStorage();
  saveRemovedTasksToStorage();
};

//* render
function renderTask(task) {
  const doneClassText = task.done ? 'done-text' : null;
  const doneClassItem = task.done ? 'done-item' : null;

  const newTask = `
        <li class="${doneClassItem} new-task bg-light rounded-3 d-flex p-1 ps-2 pe-2 mb-1" id="${task.id}">
          <span class="${doneClassText} h4 m-0 lh-2">${task.text}</span>
          <div class="ms-auto d-flex align-items-center gap-2 justify-content-center ps-2">
            <button class="btn btn-outline-success btn-sm" type="button" data-action="done">&#10003;</button>
            <button class="btn btn-outline-danger btn-sm" type="button" data-action="delete">&#10005;</button>
          </div>  
        </li>`;
  
  taskList.insertAdjacentHTML('beforeend', newTask);
};

//* save to storage
function saveTasksToStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

function saveRemovedTasksToStorage() {
  localStorage.setItem('removedTasks', JSON.stringify(removedTasks));
};

//* get count (to badge)
function getRemovedCount(task) {
  removedTasks.push(task);
  removedCountBadge.textContent = removedTasks.length;
  removedTasks.length === 0 ? removedCountBadge.textContent = '' : null;
}

function getDoneCount() {
  let doneTasks = [];

  tasks.filter(function(task) {
    task.done ? doneTasks.push(task) : null;
  });

  doneCountBadge.textContent = doneTasks.length;
  doneTasks.length === 0 ? doneCountBadge.textContent = '' : null;

  localStorage.setItem('doneTasks', JSON.stringify(doneTasks));
}

//* other utils
function checkIsEmpty() {
  if (tasks.length === 0) {
    taskList.insertAdjacentHTML('beforebegin', emptyList);
  }

  if (tasks.length > 0) {
    const emptyItem = document.querySelector('#emptyList');
    emptyItem ? emptyItem.remove() : null;
  }

  saveTasksToStorage();
};

function makeNavLinkActive(evt) {
  if (evt.target === navPanel) {
    return;
  }

  navLinks.forEach((link) => {
    link.classList.remove('active');
    evt.target === link ? link.classList.add('active') : null;
  });
}
