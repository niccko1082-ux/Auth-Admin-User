const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

// Books
export async function getBooks() {
    const res = await fetch(`${API_URL}/books`);
    return await res.json();
}

export async function updateBookStatus(id, status, userId = null) {
    const res = await fetch(`${API_URL}/books/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            status: status,
            reservedBy: userId
        })
    });
    return await res.json();
}

export async function addBook(book) {
    const res = await fetch(`${API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(book)
    });
    return await res.json();
}
