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

// Posts
export async function getPosts() {
    const res = await fetch(`${API_URL}/posts`);
    return await res.json();
}

export async function createPost(post) {
    const res = await fetch(`${API_URL}/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(post)
    });
    return await res.json();
}

export async function deletePost(id) {
    await fetch(`${API_URL}/posts/${id}`, { method: 'DELETE' });
}

export async function updatePostLikes(id, newLikes) {
    await fetch(`${API_URL}/posts/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ likes: newLikes })
    });
}

// Comments
export async function getComments(postId) {
    const res = await fetch(`${API_URL}/comments?postId=${postId}`);
    return await res.json();
}

export async function addComment(comment) {
    const res = await fetch(`${API_URL}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(comment)
    });
    return await res.json();
}
