const API_URL = 'http://localhost:3000';

// Auth
export async function login(email) {
    const res = await fetch(`${API_URL}/users?email=${email}`);
    return await res.json();
}

// Products
export async function getProducts() {
    const res = await fetch(`${API_URL}/products`);
    return await res.json();
}

export async function updateProductStock(id, newStock) {
    const res = await fetch(`${API_URL}/products/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stock: newStock })
    });
    return await res.json();
}

// Sales
export async function createSale(sale) {
    const res = await fetch(`${API_URL}/sales`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(sale)
    });
    return await res.json();
}

export async function getSales() {
    const res = await fetch(`${API_URL}/sales`);
    return await res.json();
}
