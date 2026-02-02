import { addQuestion, getResults } from '../../js/api.js';

const leaderboardList = document.getElementById('leaderboardList');
const addQuestionForm = document.getElementById('addQuestionForm');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('quiz_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    const results = await getResults();
    renderLeaderboard(results);
}

function renderLeaderboard(results) {
    leaderboardList.innerHTML = '';

    // Sort logic: Higher score first, then recent date
    results.sort((a, b) => b.score - a.score || new Date(b.date) - new Date(a.date));

    if (results.length === 0) {
        leaderboardList.innerHTML = '<p class="text-gray-400 italic p-4 text-center">No hay resultados aún.</p>';
        return;
    }

    results.forEach(r => {
        const percentage = Math.round((r.score / r.totalQuestions) * 100);
        const tr = document.createElement('tr');
        tr.className = 'border-b hover:bg-gray-50';

        tr.innerHTML = `
            <td class="p-4 text-sm font-bold text-gray-700">User #${r.userId}</td>
            <td class="p-4 text-center font-bold text-purple-700 text-lg">${r.score}</td>
            <td class="p-4 text-center text-gray-500">${r.totalQuestions}</td>
            <td class="p-4 text-right text-xs text-gray-400">${r.date}</td>
        `;
        leaderboardList.appendChild(tr);
    });
}

// Add Question
addQuestionForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newQ = {
        text: document.getElementById('qText').value,
        options: [
            document.getElementById('opt0').value,
            document.getElementById('opt1').value,
            document.getElementById('opt2').value,
            document.getElementById('opt3').value
        ],
        correctIndex: parseInt(document.getElementById('correctIdx').value)
    };

    await addQuestion(newQ);
    alert('Pregunta agregada!');
    addQuestionForm.reset();
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('quiz_session');
    window.location.href = '../../index.html';
});
