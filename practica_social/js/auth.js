import { login } from './api.js';

const loginForm = document.getElementById('loginForm');

loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const users = await login(email);

        if (users.length === 0) {
            alert('Usuario no encontrado');
            return;
        }

        const user = users[0];

        if (user.password !== password) {
            alert('Contraseña incorrecta');
            return;
        }

        localStorage.setItem('social_session', JSON.stringify(user));
        window.location.href = './html/feed.html';

    } catch (error) {
        console.error(error);
        alert('Error al iniciar sesión');
    }
});
