import { saveTasks, loadTasks } from "./modules/storage.js";
import { renderTaskList } from "./modules/render.js";
import { validateTaskInput } from "./modules/validation.js";

let tasks = loadTasks();
let currentFilter = "all";

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");
const filters = document.querySelectorAll("[data-filter]");
const countEl = document.getElementById("task-count");

function createTask(text) {
  return {
    id: Date.now(),
    text: text.trim(),
    completed: false
  };
}

function getFilteredTasks() {
  if (currentFilter === "active") return tasks.filter(t => !t.completed);
  if (currentFilter === "completed") return tasks.filter(t => t.completed);
  return tasks;
}

function updateUI() {
  renderTaskList(list, getFilteredTasks());
  countEl.textContent = `${tasks.length} tasks total`;
}

// ADD TASK
form.addEventListener("submit", e => {
  e.preventDefault();

  if (!validateTaskInput(input.value)) return;

  tasks.push(createTask(input.value));
  saveTasks(tasks);

  input.value = "";
  updateUI();
});

// DELETE + TOGGLE (EVENT DELEGATION)
list.addEventListener("click", e => {
  const li = e.target.closest(".task");
  if (!li) return;

  const id = Number(li.dataset.id);
  const index = tasks.findIndex(t => t.id === id);

  if (e.target.classList.contains("delete-btn")) {
    tasks.splice(index, 1);
  }

  if (e.target.type === "checkbox") {
    tasks[index].completed = e.target.checked;
  }

  saveTasks(tasks);
  updateUI();
});

// FILTERS
filters.forEach(btn => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter;
    updateUI();
  });
});

// INITIAL LOAD
updateUI();