todoItems = [];

function addToDoItem(text) {
  if (typeof text !== 'string') {
    console.error('Error: ' + text + ' is not a string. Text entered must be a String.');
    return;
  }

  const newTodo = {
    id: todoItems.length,
    text: text,
    completed: false,
  };

  return todoItems.push(newTodo);
}

function removeToDoItem(todoId) {
  todoItems = todoItems.filter((todo) => todo.id !== todoId);
}

function markToDoItemAsCompleted(todoId) {
  const todoIndex = todoItems.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todoItems[todoIndex].completed = true;
  }
}

function markToDoItemAsIncomplete(todoId) {
  const todoIndex = todoItems.findIndex((todo) => todo.id === todoId);
  if (todoIndex !== -1) {
    todoItems[todoIndex].completed = false;
  }
}

function deleteToDoItem(todoId) {
  todoItems = todoItems.filter((todo) => todo.id !== todoId);
}

function clearCompletedTasks() {
  todoItems = todoItems.filter((todo) => !todo.completed);
}

document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('form-task');
  const taskInput = document.getElementById('name-input');
  const taskList = document.getElementById('task-items');
  const taskCount = document.getElementById('task-count');
  const clearAllButton = document.getElementById('clear-all');
  const clearCompletedButton = document.getElementById('clear-completed');

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    const taskText = taskInput.value.trim();

    if (taskText !== '') {
      addToDoItem(taskText);
      displayTasks();
      taskInput.value = '';
    }
  });

  //BUTTONS
  clearCompletedButton.addEventListener('click', function () {
    clearCompletedTasks();
    displayTasks();
  });

  clearAllButton.addEventListener('click', function () {
    clearAllTasks();
    displayTasks();
  });

  function moveTaskUp(todoId) {
    const todoIndex = todoItems.findIndex((todo) => todo.id === todoId);
    if (todoIndex > 0) {
      const temp = todoItems[todoIndex];
      todoItems[todoIndex] = todoItems[todoIndex - 1];
      todoItems[todoIndex - 1] = temp;
      displayTasks();
    }
  }

  function moveTaskDown(todoId) {
    const todoIndex = todoItems.findIndex((todo) => todo.id === todoId);
    if (todoIndex < todoItems.length - 1) {
      const temp = todoItems[todoIndex];
      todoItems[todoIndex] = todoItems[todoIndex + 1];
      todoItems[todoIndex + 1] = temp;
      displayTasks();
    }
  }

  function createMoveButtons(todoId) {
    const moveUpButton = document.createElement('button');
    moveUpButton.textContent = 'Move Up';
    moveUpButton.addEventListener('click', function () {
      moveTaskUp(todoId);
    });

    const moveDownButton = document.createElement('button');
    moveDownButton.textContent = 'Move Down';
    moveDownButton.addEventListener('click', function () {
      moveTaskDown(todoId);
    });

    return [moveUpButton, moveDownButton];
  }




  function displayTasks() {
    taskList.innerHTML = '';

    todoItems.sort((a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1));

    todoItems.forEach(function (todo) {
      const li = document.createElement('li');
      const span = document.createElement('span');
      span.textContent = todo.text;

      li.appendChild(span);


      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', function () {
        toggleCompletion(todo.id);
        displayTasks();
      });

      li.appendChild(checkbox);

      const deleteButton = document.createElement('button');

      const trashIcon = document.createElement('img');
      trashIcon.src = './images/favicon/deleteB2.ico';
      trashIcon.alt = 'Delete';

      deleteButton.appendChild(trashIcon);

      const moveButtons = createMoveButtons(todo.id);
      moveButtons.forEach((button) => li.appendChild(button));


      deleteButton.addEventListener('click', function () {
        deleteToDoItem(todo.id);
        displayTasks();
      });

      li.appendChild(deleteButton);

      taskList.appendChild(li);
    });

    updateTaskCount();
  }

  function clearAllTasks() {
    todoItems = [];
  } 

  function toggleCompletion(todoId) {
    const todoIndex = todoItems.findIndex((todo) => todo.id === todoId);
    if (todoIndex !== -1) {
      todoItems[todoIndex].completed = !todoItems[todoIndex].completed;
    }
  }

  function updateTaskCount() {
    const incompleteTasks = todoItems.filter((todo) => !todo.completed).length;
    taskCount.textContent = `Tasks remaining: ${incompleteTasks}`;
  }
  
  displayTasks();
});
