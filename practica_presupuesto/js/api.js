const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

// Transactions
export async function getTransactions(userId = null) {
    let url = `${API_URL}/transactions`;
    if (userId) url += `?userId=${userId}`;

    const res = await fetch(url);
    return await res.json();
}

export async function addTransaction(transaction) {
    const res = await fetch(`${API_URL}/transactions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(transaction)
    });
    return await res.json();
}

export async function deleteTransaction(id) {
    await fetch(`${API_URL}/transactions/${id}`, { method: 'DELETE' });
}
