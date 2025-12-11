// Список начальных задач
const items = [
  "Сделать проектную работу",
  "Полить цветы",
  "Пройти туториал по Реакту",
  "Сделать фронт для своего проекта",
  "Прогуляться по улице в солнечный день",
  "Помыть посуду",
];


// Элементы страницы
const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


// Загрузка списка задач
function loadTasks() {

  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    return JSON.parse(storedTasks);
  }
  return items;

}


// Сохранение задач в локальное хранилище
function saveTasks(taskList) {

  localStorage.setItem('tasks', JSON.stringify(taskList));

}


// Получение задач из DOM
function getTasksFromDOM() {

  const taskElements = document.querySelectorAll('.to-do__item-text');
  const tasksArray = [];
  taskElements.forEach(element => {
    tasksArray.push(element.innerHTML);
  });
  return tasksArray;

}


// Создание элемента задачи
function createItem(taskContent) {

  const itemTemplate = document.getElementById("to-do__item-template");
  const itemClone = itemTemplate.content.querySelector(".to-do__item").cloneNode(true);
  const taskTextElement = itemClone.querySelector(".to-do__item-text");
  const deleteBtn = itemClone.querySelector(".to-do__item-button_type_delete");
  const duplicateBtn = itemClone.querySelector(".to-do__item-button_type_duplicate");
  const editBtn = itemClone.querySelector(".to-do__item-button_type_edit");
  taskTextElement.innerHTML = taskContent;


  // Обработчик удаления задачи
  deleteBtn.addEventListener('click', () => {
    itemClone.remove();
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });


  // Обработчик копирования задачи
  duplicateBtn.addEventListener('click', () => {
    const duplicatedContent = taskTextElement.innerHTML;
    const duplicatedItem = createItem(duplicatedContent);
    listElement.prepend(duplicatedItem);
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });


  // Обработчик редактирования задачи
  editBtn.addEventListener('click', () => {
    taskTextElement.setAttribute('contenteditable', 'true');
    taskTextElement.focus();
  });


  // Обработчик сохранения после редактирования
  taskTextElement.addEventListener('blur', () => {
    taskTextElement.setAttribute('contenteditable', 'false');
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
  });


  return itemClone;

}


// Обработчик отправки формы
formElement.addEventListener('submit', (event) => {

  event.preventDefault();
  const newTaskText = inputElement.value.trim();
  if (newTaskText) {
    const newTaskElement = createItem(newTaskText);
    listElement.prepend(newTaskElement);
    const currentTasks = getTasksFromDOM();
    saveTasks(currentTasks);
    inputElement.value = '';
  }

});


// Загрузка и отображение задач при загрузке страницы
const initialTasks = loadTasks();
initialTasks.forEach(task => {

  const taskElement = createItem(task);
  listElement.append(taskElement);

});