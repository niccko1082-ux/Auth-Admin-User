import { getProducts, createSale, updateProductStock } from '../../js/api.js';

const productList = document.getElementById('productList');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('inventory_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadShop);

async function loadShop() {
    const products = await getProducts();
    renderProducts(products);
}

function renderProducts(products) {
    productList.innerHTML = '';

    products.forEach(product => {
        const isOutOfStock = product.stock === 0;
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow relative';

        // Badge
        if (isOutOfStock) {
            card.innerHTML += `<div class="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded shadow">AGOTADO</div>`;
        } else {
            card.innerHTML += `<div class="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded shadow">Stock: ${product.stock}</div>`;
        }

        card.innerHTML += `
            <div class="h-48 overflow-hidden bg-gray-100 flex items-center justify-center">
                <img src="${product.image}" alt="${product.name}" class="h-full object-contain">
            </div>
            <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-bold text-lg text-gray-800 leading-tight mb-2">${product.name}</h3>
                <p class="text-2xl font-bold text-gray-900 mb-4">$${product.price}</p>
                
                <div class="mt-auto space-y-2">
                    <input type="number" min="1" max="${product.stock}" value="1" 
                        class="w-full border rounded px-2 py-1 text-center quantity-input ${isOutOfStock ? 'bg-gray-100 text-gray-400' : ''}" 
                        ${isOutOfStock ? 'disabled' : ''}>
                    
                    <button class="buy-btn w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded font-bold transition shadow disabled:bg-gray-300 disabled:cursor-not-allowed"
                        data-id="${product.id}"
                        data-price="${product.price}"
                        data-stock="${product.stock}"
                        ${isOutOfStock ? 'disabled' : ''}>
                        ${isOutOfStock ? 'Sin Stock' : 'Comprar'}
                    </button>
                </div>
            </div>
        `;
        productList.appendChild(card);
    });

    // Listeners
    document.querySelectorAll('.buy-btn').forEach((btn, index) => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const price = parseFloat(e.target.dataset.price);
            const currentStock = parseInt(e.target.dataset.stock);

            // Get quantity from the input in the same card
            const quantityInput = document.querySelectorAll('.quantity-input')[index];
            const quantity = parseInt(quantityInput.value);

            if (quantity > currentStock) {
                alert('No hay suficiente stock');
                return;
            }

            if (confirm(`¿Comprar ${quantity} unidad(es) de este producto? Total: $${(quantity * price).toFixed(2)}`)) {

                // 1. Create Sale
                const newSale = {
                    productId: id,
                    userId: session.id,
                    quantity: quantity,
                    total: quantity * price,
                    date: new Date().toISOString().split('T')[0]
                };
                await createSale(newSale);

                // 2. Update Stock
                await updateProductStock(id, currentStock - quantity);

                // Reload
                alert('Compra exitosa');
                loadShop();
            }
        });
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('inventory_session');
    window.location.href = '../../index.html';
});
