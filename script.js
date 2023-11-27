/* Assignment 04: Finishing a Todo List App */

// Backend of the code

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
  
    form.addEventListener('submit', function (event) {
      event.preventDefault();
      const taskText = taskInput.value.trim();
  
      if (taskText !== '') {
        addToDoItem(taskText);
        displayTasks();
        taskInput.value = '';
      }
    });
  
function displayTasks() {
    taskList.innerHTML = '';
    
    todoItems.forEach(function (todo) {
        const li = document.createElement('li');
        li.textContent = todo.text;
  
        const completeButton = document.createElement('button');

        completeButton.textContent = todo.completed ? 'Mark as Incomplete' : 'Mark as Completed';

        completeButton.addEventListener('click', function () {
            if (todo.completed) {
                markToDoItemAsIncomplete(todo.id);
              } else {
                markToDoItemAsCompleted(todo.id);
              }
          displayTasks();
        });
  
        const deleteButton = document.createElement('button');

        deleteButton.textContent = 'Delete';
        
        deleteButton.addEventListener('click', function () {
          deleteToDoItem(todo.id);
          displayTasks();
        });
  
        li.appendChild(completeButton);
        li.appendChild(deleteButton);
  
        taskList.appendChild(li);
      });
  
      updateTaskCount();
    }
  
    function updateTaskCount() {
      const incompleteTasks = todoItems.filter((todo) => !todo.completed).length;
      taskCount.textContent = `Tasks remaining: ${incompleteTasks}`;
    }
  
    displayTasks();
  });
  