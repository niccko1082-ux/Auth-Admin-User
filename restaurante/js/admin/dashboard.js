import { GetOrders, UpdateOrder } from '../../js/services/api.js';

const totalOrdersEl = document.getElementById('total-orders');
const pendingOrdersEl = document.getElementById('pending-orders');
const totalIncomeEl = document.getElementById('total-income');
const tableBody = document.getElementById('orders-table-body');
const logoutBtn = document.getElementById('logOut');

document.addEventListener('DOMContentLoaded', async () => {
    await loadDashboard();
});

async function loadDashboard() {
    const orders = await GetOrders();

    // Calcular Metricas
    const total = orders.length;
    const pending = orders.filter(o => o.status === 'pending').length;

    // Calcular ingresos del día (Simularemos que "hoy" es cualquier fecha o filtramos realmente)
    // Para simplificar, sumamos todo. O filtramos por new Date().toDateString()
    const today = new Date().toDateString();
    const income = orders
        .filter(o => new Date(o.date).toDateString() === today)
        .reduce((sum, o) => sum + o.total, 0);

    totalOrdersEl.innerText = total;
    pendingOrdersEl.innerText = pending;
    totalIncomeEl.innerText = `$${income.toFixed(2)}`;

    renderTable(orders);
}

function renderTable(orders) {
    tableBody.innerHTML = '';
    // Ordenar por fecha descendente
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));

    orders.forEach(order => {
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        // Colores de estado
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800',
            'preparing': 'bg-blue-100 text-blue-800',
            'delivered': 'bg-green-100 text-green-800',
            'cancelled': 'bg-red-100 text-red-800'
        };
        const statusClass = statusColors[order.status] || 'bg-gray-100 text-gray-800';

        tr.innerHTML = `
            <td class="p-4 font-mono text-sm">#${order.id.slice(0, 6)}</td>
            <td class="p-4">${order.userEmail || 'Anónimo'}</td>
            <td class="p-4 font-bold">$${order.total.toFixed(2)}</td>
            <td class="p-4 text-sm text-gray-500">${new Date(order.date).toLocaleString()}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded-full text-xs font-bold ${statusClass}">
                    ${order.status.toUpperCase()}
                </span>
            </td>
            <td class="p-4">
                <select class="status-select border rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500" 
                    data-id="${order.id}">
                    <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="preparing" ${order.status === 'preparing' ? 'selected' : ''}>Preparing</option>
                    <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                    <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                </select>
            </td>
        `;
        tableBody.appendChild(tr);
    });

    // Event listeners para cambios de estado
    document.querySelectorAll('.status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
            const id = e.target.dataset.id;
            const newStatus = e.target.value;

            if (confirm(`¿Cambiar estado a ${newStatus}?`)) {
                await UpdateOrder(id, { status: newStatus });
                // Recargar dashboard
                await loadDashboard();
            } else {
                // Revertir cambio si cancela
                e.target.value = orders.find(o => o.id === id).status;
            }
        });
    });
}

// Logout
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('session');
        window.location.href = '../../index.html';
    });
}
