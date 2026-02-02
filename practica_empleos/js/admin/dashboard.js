import { getJobs, addJob, getApplications, getUser } from '../../js/api.js';

const adminJobList = document.getElementById('adminJobList');
const postJobForm = document.getElementById('postJobForm');
const applicantsPanel = document.getElementById('applicantsPanel');
const applicantList = document.getElementById('applicantList');
const selectedJobTitle = document.getElementById('selectedJobTitle');
const closePanelBtn = document.getElementById('closePanel');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('job_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadJobs);

async function loadJobs() {
    const jobs = await getJobs();
    renderJobs(jobs);
}

function renderJobs(jobs) {
    adminJobList.innerHTML = '';

    // Reverse to show newest first
    jobs.reverse().forEach(job => {
        const div = document.createElement('div');
        div.className = 'p-4 flex justify-between items-center hover:bg-gray-50';

        div.innerHTML = `
            <div>
                <h3 class="font-bold text-gray-800">${job.title}</h3>
                <p class="text-xs text-gray-500">${job.company} - $${job.salary}</p>
            </div>
            <button class="view-apps-btn bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-1 rounded text-xs font-bold transition" 
                data-id="${job.id}" data-title="${job.title}">
                Ver Postulantes
            </button>
        `;
        adminJobList.appendChild(div);
    });

    // Listeners
    document.querySelectorAll('.view-apps-btn').forEach(btn => {
        btn.addEventListener('click', (e) => loadApplicants(e.target.dataset.id, e.target.dataset.title));
    });
}

async function loadApplicants(jobId, jobTitle) {
    // UI Update
    applicantsPanel.classList.remove('hidden');
    selectedJobTitle.innerText = jobTitle;
    applicantList.innerHTML = '<p class="text-gray-400 text-sm">Cargando...</p>';

    // Fetch Data
    const applications = await getApplications(jobId);

    if (applications.length === 0) {
        applicantList.innerHTML = '<p class="text-gray-400 italic text-sm">Nadie se ha postulado aún.</p>';
        return;
    }

    applicantList.innerHTML = '';

    // For each application, fetch user details
    for (const app of applications) {
        const user = await getUser(app.userId);

        const li = document.createElement('li');
        li.className = 'flex items-center gap-3 p-3 bg-gray-50 rounded border border-gray-100';
        li.innerHTML = `
            <div class="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center text-blue-700 font-bold text-xs">
                ${user.name ? user.name.charAt(0) : 'U'}
            </div>
            <div>
                <p class="font-bold text-sm text-gray-800">${user.name || 'Usuario Anónimo'}</p>
                <p class="text-xs text-gray-500">${user.email}</p>
                <p class="text-[10px] text-gray-400">Postulado el: ${app.date}</p>
            </div>
        `;
        applicantList.appendChild(li);
    }
}

// Post Job
postJobForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const newJob = {
        title: document.getElementById('title').value,
        company: document.getElementById('company').value,
        salary: parseInt(document.getElementById('salary').value),
        description: document.getElementById('description').value
    };

    await addJob(newJob);
    alert('Oferta publicada');
    postJobForm.reset();
    loadJobs();
});

// Close Panel
closePanelBtn.addEventListener('click', () => {
    applicantsPanel.classList.add('hidden');
});

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('job_session');
    window.location.href = '../../index.html';
});
