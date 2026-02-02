
const logOutbtn = document.getElementById('logOut');

logOutbtn.addEventListener('click', () => {
    localStorage.removeItem('session');
    window.location.href = "../../index.html"
})