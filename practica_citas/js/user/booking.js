import { getSlots, bookSlot } from '../../js/api.js';

const availableSlotsContainer = document.getElementById('availableSlots');
const myAppointmentsContainer = document.getElementById('myAppointments');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('citas_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    const allSlots = await getSlots();
    renderAvailableSlots(allSlots);
    renderMyAppointments(allSlots);
}

function renderAvailableSlots(slots) {
    const available = slots.filter(slot => slot.status === 'available');
    availableSlotsContainer.innerHTML = '';

    if (available.length === 0) {
        availableSlotsContainer.innerHTML = '<p class="text-gray-500 italic p-4">No hay turnos disponibles por el momento.</p>';
        return;
    }

    available.forEach(slot => {
        const card = document.createElement('div');
        card.className = 'bg-white rounded-lg shadow-sm p-4 border-l-4 border-teal-500 hover:shadow-md transition flex justify-between items-center';

        card.innerHTML = `
            <div>
                <h3 class="font-bold text-gray-800 text-lg">${slot.doctor}</h3>
                <p class="text-teal-600 font-medium text-sm">${slot.specialty}</p>
                <div class="text-gray-500 text-sm mt-1 flex gap-4">
                    <span>📅 ${slot.date}</span>
                    <span>⏰ ${slot.time}</span>
                </div>
            </div>
            <button class="book-btn bg-teal-600 hover:bg-teal-700 text-white px-4 py-2 rounded font-bold shadow transition" 
                data-id="${slot.id}">
                Reservar
            </button>
        `;
        availableSlotsContainer.appendChild(card);
    });

    // Listeners
    document.querySelectorAll('.book-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (confirm('¿Confirmar turno?')) {
                await bookSlot(e.target.dataset.id, session.id);
                loadData();
            }
        });
    });
}

function renderMyAppointments(slots) {
    const mySlots = slots.filter(slot => slot.patientId === session.id);
    myAppointmentsContainer.innerHTML = '';

    if (mySlots.length === 0) {
        myAppointmentsContainer.innerHTML = '<p class="text-gray-400 italic text-sm text-center py-4">Sin citas agendadas.</p>';
        return;
    }

    mySlots.forEach(slot => {
        const item = document.createElement('div');
        item.className = 'bg-teal-50 p-3 rounded border border-teal-100 text-sm';
        item.innerHTML = `
            <p class="font-bold text-gray-800">${slot.doctor}</p>
            <p class="text-gray-600">${slot.date} - ${slot.time}</p>
            <span class="text-xs text-green-600 font-bold bg-green-100 px-2 py-0.5 rounded-full inline-block mt-1">CONFIRMADO</span>
        `;
        myAppointmentsContainer.appendChild(item);
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('citas_session');
    window.location.href = '../../index.html';
});
