import { getQuestions, saveResult } from '../../js/api.js';

const questionScreen = document.getElementById('questionScreen');
const resultScreen = document.getElementById('resultScreen');
const loading = document.getElementById('loading');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const progressText = document.getElementById('progressText');
const currentScoreEl = document.getElementById('currentScore');
const finalScoreEl = document.getElementById('finalScore');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('quiz_session'));
if (session) userEmailSpan.innerText = session.email;

let questions = [];
let currentIndex = 0;
let score = 0;

document.addEventListener('DOMContentLoaded', startGame);

async function startGame() {
    questions = await getQuestions();
    loading.classList.add('hidden');

    if (questions.length === 0) {
        questionScreen.innerHTML = '<p>No hay preguntas disponibles.</p>';
        questionScreen.classList.remove('hidden');
        return;
    }

    showQuestion();
}

function showQuestion() {
    // Reset View
    questionScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    optionsContainer.innerHTML = '';

    // Get current data
    const currentQ = questions[currentIndex];

    // Update UI
    questionText.innerText = currentQ.text;
    progressText.innerText = `Pregunta ${currentIndex + 1} de ${questions.length}`;
    currentScoreEl.innerText = score;

    // Render Options
    currentQ.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.innerText = opt;
        btn.className = 'bg-gray-100 hover:bg-purple-100 border border-gray-300 text-gray-700 font-semibold py-3 px-4 rounded shadow hover:shadow-md transition text-left';

        btn.onclick = () => handleAnswer(index, currentQ.correctIndex);

        optionsContainer.appendChild(btn);
    });
}

async function handleAnswer(selectedIndex, correctIndex) {
    // Visual Feedback (Simplified)
    if (selectedIndex === correctIndex) {
        score++;
    }
    // Go Next
    currentIndex++;

    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        await finishGame();
    }
}

async function finishGame() {
    questionScreen.classList.add('hidden');
    resultScreen.classList.remove('hidden');

    finalScoreEl.innerText = `${score} / ${questions.length}`;

    if (session) {
        await saveResult({
            userId: session.id,
            score: score,
            totalQuestions: questions.length,
            date: new Date().toISOString().split('T')[0]
        });
    }
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('quiz_session');
    window.location.href = '../../index.html';
});
