let tasks = [];
let sortByDateAsc = true;

document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
});

function openModal(index = null) {
  document.getElementById('newTaskModal').style.display = 'flex';
  if (index !== null) {
    const task = tasks[index];
    document.getElementById('titleInput').value = task.title;
    document.getElementById('descInput').value = task.description;
    document.getElementById('priorityInput').value = task.priority;
    document.getElementById('editIndex').value = index;
  } else {
    document.getElementById('titleInput').value = '';
    document.getElementById('descInput').value = '';
    document.getElementById('priorityInput').value = '3';
    document.getElementById('editIndex').value = '';
  }
}

function closeModal() {
  document.getElementById('newTaskModal').style.display = 'none';
}

function saveTask() {
  const title = document.getElementById('titleInput').value.trim();
  const desc = document.getElementById('descInput').value.trim();
  const priority = parseInt(document.getElementById('priorityInput').value);
  const editIndex = document.getElementById('editIndex').value;

  if (!title) return;

  if (editIndex !== '') {
    tasks[editIndex] = {
      ...tasks[editIndex],
      title,
      description: desc,
      priority
    };
  } else {
    tasks.push({
      title,
      description: desc,
      priority,
      done: false,
      createdAt: new Date()
    });
  }

  closeModal();
  renderTasks();
}

function renderTasks() {
  const taskList = document.getElementById('taskList');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = `task ${task.done ? 'done' : ''}`;

    const priorityClass = task.priority === 1 ? 'priority-high' :
                          task.priority === 2 ? 'priority-medium' : 'priority-low';

    div.innerHTML = `
      <div class="details">
        <strong>${task.title}</strong><br/>
        ${task.description}<br/>
        <span class="priority-label ${priorityClass}">Priority: ${
          task.priority === 1 ? 'High' :
          task.priority === 2 ? 'Medium' : 'Low'
        }</span><br/>
        <small>Added: ${new Date(task.createdAt).toLocaleString()}</small>
      </div>
      <div class="buttons">
        <button onclick="toggleDone(${index})">${task.done ? 'Undo' : 'Done'}</button>
        <button onclick="openModal(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;

    taskList.appendChild(div);
  });
}

function toggleDone(index) {
  tasks[index].done = !tasks[index].done;
  document.getElementById('completeSound').play();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function sortByPriority() {
  tasks.sort((a, b) => a.priority - b.priority);
  renderTasks();
}

function toggleSortByDate() {
  tasks.sort((a, b) => {
    const dateA = new Date(a.createdAt);
    const dateB = new Date(b.createdAt);
    return sortByDateAsc ? dateA - dateB : dateB - dateA;
  });
  sortByDateAsc = !sortByDateAsc;
  renderTasks();
}