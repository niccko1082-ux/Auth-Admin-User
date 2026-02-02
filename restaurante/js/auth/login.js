import { GetUser } from "../services/api.js";

const loginForm = document.getElementById('loginForm')


if(loginForm){

    loginForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const emailImput = document.getElementById('email');
        const passwordInput = document.getElementById('password');

        const email = emailImput.value;
        const password = passwordInput.value;

        const values = {
            email,
            password
        }

        const user = await GetUser(values.email);
        const userDB = user[0]

        if(!email || !password){
            alert('Hay campos vacios');
            return;
        }

        if(user.length === 0){
            alert('El usuario no existe');
            return;
        }

        if(email === userDB.email){
            if(password === userDB.password){
                if(userDB.rol === 'Admin'){
                    setStorage(userDB)
                    window.location.href = '../html/admin/dashboard.html'
                }else{
                    setStorage(userDB)
                    window.location.href = '../html/user/dashboard.html'
                }
            }else{
                alert('Constrasena Incorrecta');
                return;
            }
        } 

    })

}

function setStorage(user){
    localStorage.setItem('session', JSON.stringify(user))
}



