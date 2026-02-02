const API_URL = 'http://localhost:3000/'


// Obtener Email 
export async function GetUser(user) {

    try {
        const res = await fetch(`${API_URL}users?email=${user}`, {
            method: "GET",
        })

        if (!res.ok) throw new Error('No fue posible obtener datos')

        const data = await res.json();
        return data

    } catch (error) {
        console.log('No fue posible obtener datos');
        return [];
    }
}

// Registrar Usuario
export async function AddUser(user) {
    try {
        const res = await fetch(`${API_URL}users`, {
            method: 'POST',
            body: JSON.stringify(user)
        })

        if (!res.ok) throw new Error('No fue posble registrarse')
        return res.json()

    } catch (error) {
        Alert('No fue posble registrarse')
    }
}