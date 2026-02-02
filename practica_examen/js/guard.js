export function protectRoute(allowedRole) {
    const session = localStorage.getItem('todo_session');

    if (!session) {
        window.location.href = '../../index.html';
        return;
    }

    const user = JSON.parse(session);

    if (user.role !== allowedRole) {
        alert('Acceso no autorizado');
        // Redirect to correct dashboard based on actual role
        if (user.role === 'admin') window.location.href = '../admin/dashboard.html';
        else window.location.href = '../user/dashboard.html';
    }
}
