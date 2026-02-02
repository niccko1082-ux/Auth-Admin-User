import { getBooks, updateBookStatus } from '../../js/api.js';

const bookList = document.getElementById('bookList');
const myReservations = document.getElementById('myReservations');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('library_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadCatalog);

async function loadCatalog() {
    const books = await getBooks();
    renderBooks(books);
    renderMyReservations(books);
}

function renderBooks(books) {
    bookList.innerHTML = '';

    books.forEach(book => {
        const isReserved = book.status === 'reserved';
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow';

        card.innerHTML = `
            <div class="h-48 overflow-hidden bg-gray-200">
                <img src="${book.image}" alt="${book.title}" class="w-full h-full object-cover">
            </div>
            <div class="p-4 flex-1 flex flex-col">
                <h3 class="font-bold text-lg text-gray-800 leading-tight mb-1">${book.title}</h3>
                <p class="text-gray-600 text-sm mb-4">${book.author}</p>
                
                <div class="mt-auto">
                    ${isReserved
                ? `<button disabled class="w-full bg-gray-300 text-gray-500 cursor-not-allowed py-2 rounded font-medium">No Disponible</button>`
                : `<button class="reserve-btn w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-medium transition" data-id="${book.id}">Reservar</button>`
            }
                </div>
            </div>
        `;
        bookList.appendChild(card);
    });

    // Listeners
    document.querySelectorAll('.reserve-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('¿Confirmar reserva?')) {
                await updateBookStatus(id, 'reserved', session.id);
                loadCatalog();
            }
        });
    });
}

function renderMyReservations(books) {
    const myBooks = books.filter(book => book.reservedBy === session.id);
    myReservations.innerHTML = '';

    if (myBooks.length === 0) {
        myReservations.innerHTML = '<p class="text-gray-500 italic col-span-full">No tienes reservas activas.</p>';
        return;
    }

    myBooks.forEach(book => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow border-l-4 border-indigo-500 p-4 flex gap-4 items-center';

        card.innerHTML = `
            <img src="${book.image}" class="w-16 h-24 object-cover rounded shadow-sm">
            <div>
                <h3 class="font-bold text-gray-800">${book.title}</h3>
                <p class="text-sm text-gray-600">${book.author}</p>
                <span class="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mt-2 font-bold">RESERVADO</span>
            </div>
        `;
        myReservations.appendChild(card);
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('library_session');
    window.location.href = '../../index.html';
});
