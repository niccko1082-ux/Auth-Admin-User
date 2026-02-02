import { getSlots, createSlot, cancelSlot } from '../../js/api.js';

const slotList = document.getElementById('slotList');
const addSlotForm = document.getElementById('addSlotForm');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('citas_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadSlots);

async function loadSlots() {
    const slots = await getSlots();
    renderSlots(slots);
}

function renderSlots(slots) {
    slotList.innerHTML = '';

    // Ordenar por fecha y hora
    slots.sort((a, b) => new Date(a.date + 'T' + a.time) - new Date(b.date + 'T' + b.time));

    slots.forEach(slot => {
        const isBooked = slot.status === 'booked';
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        tr.innerHTML = `
            <td class="p-4">
                <div class="font-bold text-gray-800">${slot.doctor}</div>
                <div class="text-xs text-gray-500">${slot.specialty}</div>
            </td>
            <td class="p-4 text-sm">
                <div>${slot.date}</div>
                <div class="font-mono text-xs text-gray-600">${slot.time}</div>
            </td>
            <td class="p-4 text-sm text-gray-600">
                ${isBooked ? `ID: ${slot.patientId}` : '-'}
            </td>
            <td class="p-4">
                <span class="px-2 py-1 rounded text-xs font-bold ${isBooked ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}">
                    ${isBooked ? 'RESERVADO' : 'LIBRE'}
                </span>
            </td>
            <td class="p-4 text-center">
                ${isBooked
                ? `<button class="cancel-btn bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-1 rounded text-xs font-bold transition" data-id="${slot.id}">
                        Liberar
                       </button>`
                : `<span class="text-gray-400 text-xs">-</span>`
            }
            </td>
        `;
        slotList.appendChild(tr);
    });

    // Listeners
    document.querySelectorAll('.cancel-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            if (confirm('¿Cancelar la cita y liberar el turno?')) {
                await cancelSlot(e.target.dataset.id);
                loadSlots();
            }
        });
    });
}

// Add Slot
addSlotForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newSlot = {
        doctor: document.getElementById('doctor').value,
        specialty: document.getElementById('specialty').value,
        date: document.getElementById('date').value,
        time: document.getElementById('time').value,
        status: 'available',
        patientId: null
    };

    await createSlot(newSlot);
    addSlotForm.reset();
    loadSlots();
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('citas_session');
    window.location.href = '../../index.html';
});
