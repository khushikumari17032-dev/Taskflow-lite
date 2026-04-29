export function renderTaskList(listEl, tasks) {
  listEl.innerHTML = "";

  if (tasks.length === 0) {
    listEl.innerHTML = "<li>No tasks yet</li>";
    return;
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;
    li.dataset.id = task.id;

    li.innerHTML = `
      <label>
        <input type="checkbox" ${task.completed ? "checked" : ""}>
        <span>${escapeHTML(task.text)}</span>
      </label>
      <button class="delete-btn">❌</button>
    `;

    listEl.appendChild(li);
  });
}

function escapeHTML(str) {
  return str.replace(/[&<>"']/g, tag => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;'
  }[tag]));
}