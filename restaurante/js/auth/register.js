import { AddUser, GetUser } from "../services/api.js";

const registerForm = document.getElementById('registerForm');
const selectRole = document.getElementById('selectedRole');
let selectedRole = null;

// Escuchar los botones

document.addEventListener('click', (e) => {

    const button = e.target.closest('[data-role]');
    if (!button) return;
    selectedRole = button.dataset.role


    selectRole.textContent = `${selectedRole}`
})

// Verificacion de formulario

if(registerForm){

    registerForm.addEventListener('submit', async (event) => {
        event.preventDefault();
    
        // Obtener valores de entrada
        const inputEmail = document.getElementById('email')
        const inputPassword = document.getElementById('password');
    
        const email = inputEmail.value;
        const password = inputPassword.value;
    
        if (email === "" && password === "" && selectedRole === null) {
            alert('Debes llenar todos los campos')
        } else if (email === "" && password === "") {
            alert('Debes llenar todos los campos')
        } else if (selectedRole === null) {
            alert("debes selecionar un rol")
        } else {
    
            const user = {
                email: email,
                password: password,
                rol: selectedRole
            }
    
            const emailVerification = await GetUser(user.email);
            
            // Verificacion y registro
    
            if(emailVerification.length > 0){
                alert('El usuario ya existe')
                return;
            }else{
                await AddUser(user)
                window.location.href = '../../index.html'
            }
        }
    })

}
