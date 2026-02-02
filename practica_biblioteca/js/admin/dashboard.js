import { getBooks, addBook, updateBookStatus } from '../../js/api.js';

const bookList = document.getElementById('adminBookList');
const addBookForm = document.getElementById('addBookForm');
const totalBooksSpan = document.getElementById('totalBooks');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('library_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadInventory);

async function loadInventory() {
    const books = await getBooks();
    totalBooksSpan.innerText = `${books.length} Libros`;
    renderBooks(books);
}

function renderBooks(books) {
    bookList.innerHTML = '';

    books.forEach(book => {
        const isReserved = book.status === 'reserved';
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        tr.innerHTML = `
            <td class="p-4">
                <div class="flex items-center gap-3">
                    <img src="${book.image}" class="w-10 h-14 object-cover rounded shadow-sm">
                    <div>
                        <p class="font-bold text-gray-800">${book.title}</p>
                        <p class="text-xs text-gray-500">${book.author}</p>
                    </div>
                </div>
            </td>
            <td class="p-4">
                <span class="px-2 py-1 rounded text-xs font-bold ${isReserved ? 'bg-orange-100 text-orange-800' : 'bg-green-100 text-green-800'}">
                    ${isReserved ? 'RESERVADO' : 'DISPONIBLE'}
                </span>
            </td>
            <td class="p-4 text-sm text-gray-600">
                ${book.reservedBy ? `User ID: ${book.reservedBy}` : '-'}
            </td>
            <td class="p-4 text-center">
                ${isReserved
                ? `<button class="return-btn bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-1 rounded text-xs font-bold transition" data-id="${book.id}">
                        Devolver
                       </button>`
                : `<span class="text-gray-400 text-xs">-</span>`
            }
            </td>
        `;
        bookList.appendChild(tr);
    });

    // Listeners for Return
    document.querySelectorAll('.return-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const id = e.target.dataset.id;
            if (confirm('¿Marcar libro como devuelto?')) {
                await updateBookStatus(id, 'available', null);
                loadInventory();
            }
        });
    });
}

// Add Book
addBookForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newBook = {
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        image: document.getElementById('image').value,
        status: 'available',
        reservedBy: null
    };

    await addBook(newBook);
    addBookForm.reset();
    loadInventory();
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('library_session');
    window.location.href = '../../index.html';
});
