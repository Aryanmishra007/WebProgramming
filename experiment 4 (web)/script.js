// Get elements
const input = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const totalEl = document.getElementById('total');
const completedEl = document.getElementById('completed');

let tasks = [];

// Add task function
function addTask() {
  const text = input.value.trim();
  
  if (text === '') {
    alert('Please enter a task!');
    return;
  }
  
  const task = {
    id: Date.now(),
    text: text,
    done: false
  };
  
  tasks.push(task);
  input.value = '';
  render();
}

// Enter key support
input.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Toggle task completion
function toggleTask(id) {
  tasks = tasks.map(task => 
    task.id === id ? {...task, done: !task.done} : task
  );
  render();
}

// Edit task
function editTask(id) {
  const task = tasks.find(t => t.id === id);
  const newText = prompt('Edit task:', task.text);
  
  if (newText && newText.trim() !== '') {
    tasks = tasks.map(t => 
      t.id === id ? {...t, text: newText.trim()} : t
    );
    render();
  }
}

// Delete task
function deleteTask(id) {
  tasks = tasks.filter(task => task.id !== id);
  render();
}

// Render tasks
function render() {
  list.innerHTML = '';
  
  tasks.forEach(task => {
    const li = document.createElement('li');
    if (task.done) li.classList.add('done');
    
    li.innerHTML = `
      <input type="checkbox" ${task.done ? 'checked' : ''} 
             onchange="toggleTask(${task.id})">
      <span>${task.text}</span>
      <button class="edit-btn" onclick="editTask(${task.id})">Edit</button>
      <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
    `;
    
    list.appendChild(li);
  });
  
  updateStats();
}

// Update statistics
function updateStats() {
  totalEl.textContent = tasks.length;
  completedEl.textContent = tasks.filter(t => t.done).length;
}