const container = document.querySelector("#container");
const input = document.getElementById("input");
const buttone = document.getElementById("buttone");
const reset_tasks = document.getElementById("btn-reset");
const tasks = document.querySelector("#tasks");
const ul = document.createElement("ul");

buttone.addEventListener("click", addTask);
input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") addTask();
});
reset_tasks.addEventListener("click", () => {
  const confirmation = prompt("Reset Tasks List? (yes/no)");
  if (confirmation.toLowerCase().trim() === "yes") {
    ul.innerHTML = "";
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
  const li = document.createElement("li");
  li.innerHTML =
    "<span>" +
    taskText +
    "</span>" +
    '<input type="button" value="delete" class="delete-button">';
  ul.appendChild(li);
  tasks.appendChild(ul);

  const deleteButtons = document.querySelectorAll(".delete-button");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", deleteTask);
  });
}

function deleteTask() {
  const taskText = this.parentNode.querySelector("span").innerText;
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
