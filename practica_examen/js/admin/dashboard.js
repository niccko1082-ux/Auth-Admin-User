import { getTasks, deleteTask } from '../../js/api.js';

const taskList = document.getElementById('adminTaskList');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Get Session
const session = JSON.parse(localStorage.getItem('todo_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadAllTasks);

async function loadAllTasks() {
    const tasks = await getTasks(); // No arguments = get all
    renderTasks(tasks);
}

function renderTasks(tasks) {
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        tr.innerHTML = `
            <td class="p-4 font-mono text-sm">${task.id}</td>
            <td class="p-4 font-medium text-gray-800">${task.title}</td>
            <td class="p-4 text-gray-600">${task.userId}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded text-xs font-bold ${task.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}">
                    ${task.status.toUpperCase()}
                </span>
            </td>
            <td class="p-4">
                <button class="delete-btn bg-red-100 text-red-600 hover:bg-red-200 px-3 py-1 rounded font-bold text-sm" 
                    data-id="${task.id}">
                    Delete
                </button>
            </td>
        `;
        taskList.appendChild(tr);
    });

    // Listeners for delete buttons
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('Are you sure you want to delete this task?')) {
                await deleteTask(id);
                loadAllTasks();
            }
        });
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('todo_session');
    window.location.href = '../../index.html';
});
