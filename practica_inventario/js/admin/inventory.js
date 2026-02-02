import { getProducts, updateProductStock, getSales } from '../../js/api.js';

const inventoryList = document.getElementById('inventoryList');
const salesList = document.getElementById('salesList');
const totalProductsEl = document.getElementById('totalProducts');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('inventory_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadAdmin);

async function loadAdmin() {
    const products = await getProducts();
    const sales = await getSales();

    totalProductsEl.innerText = `${products.length} Productos`;
    renderInventory(products);
    renderSales(sales, products);
}

function renderInventory(products) {
    inventoryList.innerHTML = '';

    products.forEach(p => {
        const isLowStock = p.stock < 5;
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        tr.innerHTML = `
            <td class="p-4 flex items-center gap-3">
                <img src="${p.image}" class="w-10 h-10 object-contain rounded bg-white border">
                <span class="font-bold text-gray-700">${p.name}</span>
            </td>
            <td class="p-4 text-right font-mono">$${p.price}</td>
            <td class="p-4 text-center">
                <span class="px-2 py-1 rounded text-xs font-bold ${isLowStock ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${p.stock} Unidades
                </span>
            </td>
            <td class="p-4 text-center">
                <div class="flex items-center justify-center gap-2">
                    <input type="number" min="1" value="5" class="w-16 border rounded px-1 text-center text-sm restock-input">
                    <button class="restock-btn bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold transition" 
                        data-id="${p.id}" data-stock="${p.stock}">
                        + Stock
                    </button>
                </div>
            </td>
        `;
        inventoryList.appendChild(tr);
    });

    // Listeners
    document.querySelectorAll('.restock-btn').forEach((btn, index) => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            const currentStock = parseInt(e.target.dataset.stock);

            const input = document.querySelectorAll('.restock-input')[index];
            const amountToAdd = parseInt(input.value);

            if (amountToAdd > 0) {
                await updateProductStock(id, currentStock + amountToAdd);
                alert('Stock actualizado');
                loadAdmin();
            }
        });
    });
}

function renderSales(sales, products) {
    salesList.innerHTML = '';

    if (sales.length === 0) {
        salesList.innerHTML = '<p class="text-gray-400 italic text-center">Sin ventas registradas.</p>';
        return;
    }

    // Newest first
    sales.reverse();

    sales.forEach(s => {
        const product = products.find(p => p.id === s.productId);
        const productName = product ? product.name : 'Producto Eliminado';

        const li = document.createElement('li');
        li.className = 'py-3 flex justify-between items-center';
        li.innerHTML = `
            <div>
                <p class="text-sm font-bold text-gray-800">${productName} <span class="text-gray-500 font-normal">x${s.quantity}</span></p>
                <p class="text-xs text-gray-400">${s.date}</p>
            </div>
            <div class="font-bold text-green-600 font-mono">
                +$${s.total}
            </div>
        `;
        salesList.appendChild(li);
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('inventory_session');
    window.location.href = '../../index.html';
});
