export function protectRoute() {
    const session = localStorage.getItem('social_session');

    if (!session) {
        window.location.href = '../index.html';
        return;
    }
}
