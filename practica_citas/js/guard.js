export function protectRoute(allowedRole) {
    const session = localStorage.getItem('citas_session');

    if (!session) {
        window.location.href = '../../index.html';
        return;
    }

    const user = JSON.parse(session);

    if (user.role !== allowedRole) {
        alert('Acceso no autorizado');
        if (user.role === 'admin') window.location.href = '../admin/dashboard.html';
        else window.location.href = '../user/booking.html';
    }
}
