const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

export async function getUser(id) {
    const res = await fetch(`${API_URL}/users/${id}`);
    return await res.json();
}

// Jobs
export async function getJobs() {
    const res = await fetch(`${API_URL}/jobs`);
    return await res.json();
}

export async function addJob(job) {
    const res = await fetch(`${API_URL}/jobs`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(job)
    });
    return await res.json();
}

// Applications
export async function getApplications(jobId = null, userId = null) {
    let url = `${API_URL}/applications`;
    const params = [];
    if (jobId) params.push(`jobId=${jobId}`);
    if (userId) params.push(`userId=${userId}`);

    if (params.length > 0) url += `?${params.join('&')}`;

    const res = await fetch(url);
    return await res.json();
}

export async function createApplication(application) {
    const res = await fetch(`${API_URL}/applications`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(application)
    });
    return await res.json();
}
