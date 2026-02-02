const API_URL = 'http://localhost:3000/'

// Obtener Email (Login)
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
        if (!res.ok) throw new Error('No fue posible registrarse')
        return res.json()
    } catch (error) {
        alert('No fue posible registrarse')
    }
}

// Obtener Productos
export async function GetProducts() {
    try {
        const res = await fetch(`${API_URL}products`);
        if (!res.ok) throw new Error('Error al obtener productos');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Crear Orden
export async function CreateOrder(order) {
    try {
        const res = await fetch(`${API_URL}orders`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        });
        if (!res.ok) throw new Error('Error al crear orden');
        return await res.json();
    } catch (error) {
        console.error(error);
        alert('No se pudo crear la orden');
    }
}

// Obtener Ordenes (Opcional filtrar por userId si se pasa query param)
export async function GetOrders(userId = null) {
    try {
        let url = `${API_URL}orders`;
        if (userId) url += `?userId=${userId}`;

        const res = await fetch(url);
        if (!res.ok) throw new Error('Error al obtener ordenes');
        return await res.json();
    } catch (error) {
        console.error(error);
        return [];
    }
}

// Actualizar Orden (Status)
export async function UpdateOrder(id, orderData) {
    try {
        const res = await fetch(`${API_URL}orders/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(orderData)
        });
        if (!res.ok) throw new Error('Error al actualizar orden');
        return await res.json();
    } catch (error) {
        console.error(error);
        alert('No se pudo actualizar la orden');
    }
}