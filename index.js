const input = document.getElementById("input");
const buttone = document.getElementById("buttone");
const reset_tasks = document.getElementById("btn-reset");
const tasks = document.querySelector("#tasks");

buttone.addEventListener("click", addTask);

reset_tasks.addEventListener("click", () => {
  const confirmation = prompt("Reset Tasks List? (yes/no)");
  if (confirmation.toLowerCase().trim() === "yes") {
    tasks.innerHTML = "";
    localStorage.removeItem("tasks");
  }
});
function addTask() {
  const taskText = input.value.trim();
  if (taskText !== "") {
    createTaskElement(taskText);
    saveTask(taskText);
  } else {
    alert("No task inserted");
  }
}

function createTaskElement(taskText) {
  const p = document.createElement("p");
  p.className = "list-item";
  p.innerHTML = `<p class="item">${taskText}</p> <button class="delete-task">delete task</button>`;
  // Inserisce il nuovo task come primo elemento all'interno del contenitore delle tasks
  if (tasks.firstChild) {
    tasks.insertBefore(p, tasks.firstChild);
  } else {
    tasks.appendChild(p);
  }

  const deleteButtons = document.querySelectorAll(".delete-task");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

function deleteTask() {
  const taskText = this.parentNode.querySelector("p").innerText;
  this.parentNode.remove();
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  const newTasksArray = tasksArray.filter((task) => task !== taskText);
  localStorage.setItem("tasks", JSON.stringify(newTasksArray));
}
function saveTask(task) {
  let tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksArray.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasksArray));
}

document.addEventListener("DOMContentLoaded", () => {
  const tasksArray = JSON.parse(localStorage.getItem("tasks")) || [];
  tasksArray.forEach((task) => {
    createTaskElement(task);
  });
});
