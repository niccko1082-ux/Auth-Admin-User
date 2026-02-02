export function protectRoute(allowedRole) {
  const session = localStorage.getItem('session');

  if (!session) {
    window.location.href = '../../index.html';
    return;
  }

  const user = JSON.parse(session);

  if (user.rol !== allowedRole) {
    alert('Acceso denegado');
    window.location.href = '../../index.html';
  }
}


