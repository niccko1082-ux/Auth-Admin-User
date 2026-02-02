import { GetProducts, CreateOrder } from '../../js/services/api.js';
import { protectRoute } from '../../js/guards/authGuard.js';

// Validar sesión
protectRoute('User');

const productContainer = document.getElementById('product-list');
const cartCountElement = document.getElementById('cart-count'); // Ya no existe en el nuevo HTML, pero podemos dejarlo o limpiarlo si da error
const cartItemsContainer = document.getElementById('cart-items');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const logoutBtn = document.getElementById('logOut');
const userEmailSpan = document.getElementById('user-email');

let cart = [];

document.addEventListener('DOMContentLoaded', async () => {
    // Set user email
    const session = JSON.parse(localStorage.getItem('session'));
    if (session && userEmailSpan) userEmailSpan.innerText = session.email;

    await loadProducts();
    updateCartUI(); // Para iniciar estado vacio
});

async function loadProducts() {
    const products = await GetProducts();
    productContainer.innerHTML = '';

    products.forEach(product => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg transition-shadow';

        card.innerHTML = `
            <img src="${product.imagen}" alt="${product.nombre}" class="w-full h-32 object-cover rounded-md mb-4">
            <h3 class="text-lg font-bold text-gray-800">${product.nombre}</h3>
            <p class="text-gray-600 font-medium mb-4">$${product.precio.toFixed(2)}</p>
            <button class="add-to-cart bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded transition w-full shadow" 
                data-id="${product.id}" 
                data-name="${product.nombre}" 
                data-price="${product.precio}"
                data-image="${product.imagen}">
                Agregar
            </button>
        `;
        productContainer.appendChild(card);
    });

    // Event listeners
    document.querySelectorAll('.add-to-cart').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const product = {
                id: e.target.dataset.id,
                nombre: e.target.dataset.name,
                precio: parseFloat(e.target.dataset.price),
                imagen: e.target.dataset.image
            };
            addToCart(product);
        });
    });
}

function addToCart(product) {
    cart.push(product);
    updateCartUI();
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartUI();
}

function updateCartUI() {
    // Render Items
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="text-gray-500 text-center py-4 italic">El carrito está vacío</p>';
        checkoutBtn.disabled = true;
    } else {
        checkoutBtn.disabled = false;

        cart.forEach((item, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'flex justify-between items-center text-sm p-2 border-b last:border-0';
            itemEl.innerHTML = `
                <div class="flex items-center gap-3">
                    <div class="flex flex-col">
                        <span class="font-medium text-gray-800">${item.nombre}</span>
                        <span class="text-xs text-gray-500">$${item.precio.toFixed(2)}</span>
                    </div>
                </div>
                <button class="remove-btn text-red-500 hover:text-red-700 font-bold px-2 py-1" data-index="${index}">
                    ✕
                </button>
            `;
            cartItemsContainer.appendChild(itemEl);
        });

        // Add listeners to remove buttons
        document.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                removeFromCart(e.target.dataset.index);
            });
        });
    }

    // Update Totals
    const total = cart.reduce((sum, item) => sum + item.precio, 0);
    cartSubtotalElement.innerText = `$${total.toFixed(2)}`;
    cartTotalElement.innerText = `$${total.toFixed(2)}`;

    // Update checkout button text with count
    checkoutBtn.innerText = cart.length > 0 ? `Ordenar (${cart.length})` : 'Confirmar Pedido';
}

// Checkout
checkoutBtn.addEventListener('click', async () => {
    if (cart.length === 0) return;

    if (!confirm('¿Confirmar el pedido por ' + cartTotalElement.innerText + '?')) return;

    const session = JSON.parse(localStorage.getItem('session'));
    const total = cart.reduce((sum, item) => sum + item.precio, 0);

    const newOrder = {
        userId: session.id || session.email, // Fallback if id missing
        userEmail: session.email,
        items: cart,
        total: total,
        status: 'pending',
        date: new Date().toISOString()
    };

    checkoutBtn.disabled = true;
    checkoutBtn.innerText = 'Procesando...';

    const res = await CreateOrder(newOrder);

    if (res) {
        alert('¡Orden enviada a cocina! ID: ' + res.id);
        cart = [];
        updateCartUI();
    } else {
        checkoutBtn.disabled = false;
        updateCartUI();
    }
});

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('session');
        window.location.href = '../../index.html';
    });
}
