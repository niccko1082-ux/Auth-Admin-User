import { getTransactions, deleteTransaction } from '../../js/api.js';

const auditList = document.getElementById('auditList');
const totalTransactionsEl = document.getElementById('totalTransactions');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('budget_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadAudit);

async function loadAudit() {
    const transactions = await getTransactions(); // Get all
    totalTransactionsEl.innerText = `${transactions.length} Movimientos`;
    renderAudit(transactions);
}

function renderAudit(transactions) {
    auditList.innerHTML = '';

    // Sort by date desc
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    transactions.forEach(t => {
        const isIncome = t.type === 'income';
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        tr.innerHTML = `
            <td class="p-4 text-sm text-gray-600">${t.userId}</td>
            <td class="p-4 font-bold text-gray-800">${t.category}</td>
            <td class="p-4 text-sm text-gray-500">${t.date}</td>
            <td class="p-4">
                <span class="px-2 py-1 rounded text-xs font-bold ${isIncome ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}">
                    ${isIncome ? 'INGRESO' : 'GASTO'}
                </span>
            </td>
            <td class="p-4 text-right font-mono font-bold ${isIncome ? 'text-emerald-600' : 'text-red-600'}">
                $${t.amount.toFixed(2)}
            </td>
            <td class="p-4 text-center">
                <button class="delete-btn bg-gray-200 hover:bg-red-200 text-gray-700 hover:text-red-700 px-3 py-1 rounded text-xs font-bold transition" 
                    data-id="${t.id}">
                    Eliminar
                </button>
            </td>
        `;
        auditList.appendChild(tr);
    });

    // Listeners
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (confirm('¿Eliminar este registro permanentemente?')) {
                await deleteTransaction(e.target.dataset.id);
                loadAudit();
            }
        });
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('budget_session');
    window.location.href = '../../index.html';
});
