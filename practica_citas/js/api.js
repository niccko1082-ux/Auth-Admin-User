const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

// Slots
export async function getSlots() {
    const res = await fetch(`${API_URL}/slots`);
    return await res.json();
}

export async function createSlot(slot) {
    const res = await fetch(`${API_URL}/slots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(slot)
    });
    return await res.json();
}

export async function bookSlot(id, patientId) {
    const res = await fetch(`${API_URL}/slots/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'booked',
            patientId: patientId
        })
    });
    return await res.json();
}

export async function cancelSlot(id) {
    const res = await fetch(`${API_URL}/slots/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: 'available',
            patientId: null
        })
    });
    return await res.json();
}
