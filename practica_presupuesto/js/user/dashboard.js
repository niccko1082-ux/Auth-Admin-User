import { getTransactions, addTransaction } from '../../js/api.js';

const transactionList = document.getElementById('transactionList');
const transactionForm = document.getElementById('transactionForm');
const totalIncomeEl = document.getElementById('totalIncome');
const totalExpenseEl = document.getElementById('totalExpense');
const netBalanceEl = document.getElementById('netBalance');
const filterSelect = document.getElementById('filterCategory');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('budget_session'));
if (session) userEmailSpan.innerText = session.email;

let allTransactions = [];

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    allTransactions = await getTransactions(session.id);
    updateSummary(allTransactions);
    updateCategories(allTransactions);
    renderTransactions(allTransactions);
}

function updateSummary(transactions) {
    const income = transactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

    const balance = income - expense;

    totalIncomeEl.innerText = `$${income.toFixed(2)}`;
    totalExpenseEl.innerText = `$${expense.toFixed(2)}`;
    netBalanceEl.innerText = `$${balance.toFixed(2)}`;

    // Color balance
    if (balance >= 0) netBalanceEl.className = 'text-2xl font-bold text-emerald-600';
    else netBalanceEl.className = 'text-2xl font-bold text-red-600';
}

function updateCategories(transactions) {
    const categories = [...new Set(transactions.map(t => t.category))];
    const currentVal = filterSelect.value;

    filterSelect.innerHTML = '<option value="all">Todas las Categorías</option>';
    categories.forEach(cat => {
        const option = document.createElement('option');
        option.value = cat;
        option.innerText = cat;
        filterSelect.appendChild(option);
    });

    filterSelect.value = currentVal;
}

function renderTransactions(transactions) {
    transactionList.innerHTML = '';

    if (transactions.length === 0) {
        transactionList.innerHTML = '<p class="text-gray-400 italic p-4 text-center">No hay movimientos registrados.</p>';
        return;
    }

    // Sort by date desc
    transactions.sort((a, b) => new Date(b.date) - new Date(a.date));

    transactions.forEach(t => {
        const isIncome = t.type === 'income';
        const li = document.createElement('li');
        li.className = 'p-4 flex justify-between items-center hover:bg-gray-50 transition';

        li.innerHTML = `
            <div>
                <p class="font-bold text-gray-800">${t.category}</p>
                <p class="text-xs text-gray-500">${t.date}</p>
            </div>
            <div class="font-bold ${isIncome ? 'text-emerald-600' : 'text-red-600'}">
                ${isIncome ? '+' : '-'} $${t.amount.toFixed(2)}
            </div>
        `;
        transactionList.appendChild(li);
    });
}

// Add Transaction
transactionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newTransaction = {
        userId: session.id,
        type: document.getElementById('type').value,
        amount: parseFloat(document.getElementById('amount').value),
        category: document.getElementById('category').value,
        date: document.getElementById('date').value
    };

    await addTransaction(newTransaction);
    transactionForm.reset();

    // Reload
    loadData();
});

// Filter
filterSelect.addEventListener('change', (e) => {
    const category = e.target.value;
    if (category === 'all') {
        renderTransactions(allTransactions);
    } else {
        const filtered = allTransactions.filter(t => t.category === category);
        renderTransactions(filtered);
    }
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('budget_session');
    window.location.href = '../../index.html';
});
