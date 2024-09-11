let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let tasksDiv = document.querySelector(".tasks");
let deleteAll = document.querySelector(".dltall")

let tasksArr = [];
if (localStorage.getItem("tasks")) {
  tasksArr = JSON.parse(localStorage.getItem("tasks"))
}
getData();

submit.onclick = function () {
  if (input.value !== "") {
    let task = input.value;
    addTaskToArray(task);
    input.value = "";
  }
};

tasksDiv.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    e.target.parentElement.remove();
    deleteTaskWith(e.target.parentElement.getAttribute("data-id"));
  }
  if (e.target.classList.contains("task")) {
    e.target.classList.toggle("done")
    toggleCompleted(e.target.getAttribute("data-id"))
  }
});

deleteAll.onclick = function () {
  tasksDiv.innerHTML = "";
  localStorage.clear();
  tasksArr.length = 0;
}

function addTaskToArray(taskText) {
  let task = {
    id: Date.now(),
    title: taskText,
    completed: false,
  };
  tasksArr.push(task);
  addElementsToPageFrom(tasksArr);
  addToLocalStorage(tasksArr);
}

function addElementsToPageFrom(arr) {
  tasksDiv.innerHTML = "";
  arr.forEach((task) => {
    // Craete The Task Div
    let div = document.createElement("div");
    if (task.completed) {
      div.className = "task done";
    } else {
      div.className = "task";
    }
    div.setAttribute("data-id", task.id);
    let taskDiv = document.createElement("p");
    taskDiv.className = "task-text";
    taskDiv.innerHTML = task.title;
    div.appendChild(taskDiv);
    // Create The Delete Button
    let span = document.createElement("button");
    span.className = "del";
    span.appendChild(document.createTextNode("Delete"));
    div.appendChild(span);
    tasksDiv.append(div);
  });
}

function addToLocalStorage(tasksArr) {
  window.localStorage.setItem("tasks", JSON.stringify(tasksArr));
}

function getData() {
  let data = window.localStorage.getItem("tasks");
  if (data) {
    let tasks = JSON.parse(data);
    addElementsToPageFrom(tasks);
  }
}

function deleteTaskWith(id) {
  tasksArr = tasksArr.filter((e) => {
    return e.id != id;
  });
  addToLocalStorage(tasksArr);
}

function toggleCompleted(id) {
  for (let i = 0; i < tasksArr.length; i++) {
    if (tasksArr[i].id == id) {
      tasksArr[i].completed === false ? tasksArr[i].completed = true : tasksArr[i].completed = false
    }
  }
  addToLocalStorage(tasksArr);
}