const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

// Tasks
export async function getTasks(userId = null) {
    let url = `${API_URL}/tasks`;
    if (userId) url += `?userId=${userId}`;

    const res = await fetch(url);
    return await res.json();
}

export async function addTask(task) {
    const res = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    return await res.json();
}

export async function updateTask(id, updates) {
    const res = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    return await res.json();
}

export async function deleteTask(id) {
    await fetch(`${API_URL}/tasks/${id}`, { method: 'DELETE' });
}
