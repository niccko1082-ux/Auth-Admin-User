import { getTasks, addTask, updateTask } from '../../js/api.js';

const taskList = document.getElementById('taskList');
const addTaskForm = document.getElementById('addTaskForm');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Get Session
const session = JSON.parse(localStorage.getItem('todo_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadTasks);

async function loadTasks() {
    const tasks = await getTasks(session.id);
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    if (tasks.length === 0) {
        taskList.innerHTML = '<p class="text-gray-400 text-center py-4">No tasks yet.</p>';
        return;
    }

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `flex items-center justify-between p-3 border-b last:border-0 ${task.status === 'completed' ? 'bg-gray-50' : ''}`;

        li.innerHTML = `
            <div class="flex items-center gap-3">
                <input type="checkbox" class="w-5 h-5 cursor-pointer task-check" 
                    data-id="${task.id}" 
                    ${task.status === 'completed' ? 'checked' : ''}>
                <span class="${task.status === 'completed' ? 'line-through text-gray-400' : 'text-gray-800'}">
                    ${task.title}
                </span>
            </div>
            <span class="text-xs ${task.status === 'completed' ? 'text-green-500' : 'text-yellow-500'} font-bold">
                ${task.status.toUpperCase()}
            </span>
        `;
        taskList.appendChild(li);
    });

    // Listeners for checkboxes
    document.querySelectorAll('.task-check').forEach(check => {
        check.addEventListener('change', async (e) => {
            const id = e.target.dataset.id;
            const newStatus = e.target.checked ? 'completed' : 'pending';

            await updateTask(id, { status: newStatus });
            loadTasks();
        });
    });
}

// Add Task
addTaskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const titleInput = document.getElementById('taskTitle');
    const title = titleInput.value;

    if (!title) return;

    const newTask = {
        userId: session.id,
        title: title,
        status: 'pending'
    };

    await addTask(newTask);
    titleInput.value = '';
    loadTasks();
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('todo_session');
    window.location.href = '../../index.html';
});
