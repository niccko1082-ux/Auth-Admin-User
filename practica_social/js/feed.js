import { getPosts, createPost, deletePost, updatePostLikes, getUser, getComments, addComment } from '../js/api.js';

const feedContainer = document.getElementById('feed');
const createPostForm = document.getElementById('createPostForm');
const logoutBtn = document.getElementById('logoutBtn');
const userNameSpan = document.getElementById('user-name');

// Session
const session = JSON.parse(localStorage.getItem('social_session'));
if (session) userNameSpan.innerText = session.name;

document.addEventListener('DOMContentLoaded', loadFeed);

async function loadFeed() {
    const posts = await getPosts();
    renderPosts(posts);
}

function renderPosts(posts) {
    feedContainer.innerHTML = '';

    // Reverse chronological order
    posts.reverse().forEach(async (post) => {
        // Fetch User and Comments for each post
        const user = await getUser(post.userId);
        const comments = await getComments(post.id);

        const isOwner = post.userId === session.id;

        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow border border-gray-100 overflow-hidden';

        // --- Header ---
        let headerHTML = `
            <div class="p-4 flex justify-between items-center border-b border-gray-100">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center font-bold">
                        ${user.name ? user.name.charAt(0) : 'U'}
                    </div>
                    <div>
                        <p class="font-bold text-sm text-gray-800">${user.name || 'Desconocido'}</p>
                        <p class="text-xs text-gray-400">${post.date}</p>
                    </div>
                </div>
                ${isOwner ? `<button class="delete-btn text-red-500 hover:text-red-700 text-sm font-bold" data-id="${post.id}">Eliminar</button>` : ''}
            </div>
        `;

        // --- Content ---
        let contentHTML = `
            <div class="p-4">
                <p class="text-gray-800 mb-4">${post.content}</p>
                <div class="flex items-center gap-4">
                    <button class="like-btn flex items-center gap-1 text-gray-500 hover:text-pink-500 transition" 
                        data-id="${post.id}" data-likes="${post.likes}">
                        ❤️ <span class="font-bold text-sm">${post.likes}</span>
                    </button>
                    <button class="comment-toggle-btn flex items-center gap-1 text-gray-500 hover:text-blue-500 transition"
                        data-id="${post.id}">
                        💬 <span class="font-bold text-sm">${comments.length}</span>
                    </button>
                </div>
            </div>
        `;

        // --- Comments Section ---
        let commentsHTML = `
            <div class="bg-gray-50 p-4 border-t border-gray-100 hidden" id="comments-${post.id}">
                <div class="space-y-2 mb-3" id="comments-list-${post.id}">
                    ${comments.map(c => `<p class="text-sm"><span class="font-bold text-gray-700">User #${c.userId}:</span> ${c.text}</p>`).join('')}
                </div>
                <form class="comment-form flex gap-2" data-id="${post.id}">
                    <input type="text" class="flex-1 border rounded px-2 py-1 text-sm bg-white" placeholder="Escribe un comentario..." required>
                    <button type="submit" class="text-blue-500 font-bold text-xs uppercase">Enviar</button>
                </form>
            </div>
        `;

        card.innerHTML = headerHTML + contentHTML + commentsHTML;
        feedContainer.appendChild(card);
    });
}

// Global Event Delegation (Better for dynamic lists)
feedContainer.addEventListener('click', async (e) => {
    // Delete
    if (e.target.classList.contains('delete-btn')) {
        const id = e.target.dataset.id;
        if (confirm('¿Borrar publicación?')) {
            await deletePost(id);
            loadFeed();
        }
    }

    // Like
    if (e.target.closest('.like-btn')) {
        const btn = e.target.closest('.like-btn');
        const id = btn.dataset.id;
        const currentLikes = parseInt(btn.dataset.likes);
        await updatePostLikes(id, currentLikes + 1);
        loadFeed(); // ideally just update DOM, but reload is safer for sync
    }

    // Toggle Comments
    if (e.target.closest('.comment-toggle-btn')) {
        const btn = e.target.closest('.comment-toggle-btn');
        const id = btn.dataset.id;
        document.getElementById(`comments-${id}`).classList.toggle('hidden');
    }
});

feedContainer.addEventListener('submit', async (e) => {
    if (e.target.classList.contains('comment-form')) {
        e.preventDefault();
        const form = e.target;
        const postId = form.dataset.id;
        const input = form.querySelector('input');

        const newComment = {
            postId: postId,
            userId: session.id,
            text: input.value
        };

        await addComment(newComment);
        loadFeed();
    }
});

// Create Post
createPostForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const content = document.getElementById('postContent').value;

    const newPost = {
        userId: session.id,
        content: content,
        likes: 0,
        date: new Date().toISOString().split('T')[0]
    };

    await createPost(newPost);
    createPostForm.reset();
    loadFeed();
});


// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('social_session');
    window.location.href = '../index.html';
});
