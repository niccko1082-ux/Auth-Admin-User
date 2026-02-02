const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

// Questions
export async function getQuestions() {
    const res = await fetch(`${API_URL}/questions`);
    return await res.json();
}

export async function addQuestion(question) {
    const res = await fetch(`${API_URL}/questions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(question)
    });
    return await res.json();
}

// Results
export async function saveResult(result) {
    const res = await fetch(`${API_URL}/results`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(result)
    });
    return await res.json();
}

export async function getResults() {
    const res = await fetch(`${API_URL}/results`);
    return await res.json();
}
