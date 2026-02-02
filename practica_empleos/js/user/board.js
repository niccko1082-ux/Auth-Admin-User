import { getJobs, getApplications, createApplication } from '../../js/api.js';

const jobList = document.getElementById('jobList');
const myApplicationsContainer = document.getElementById('myApplications');
const logoutBtn = document.getElementById('logoutBtn');
const userEmailSpan = document.getElementById('user-email');

// Session
const session = JSON.parse(localStorage.getItem('job_session'));
if (session) userEmailSpan.innerText = session.email;

document.addEventListener('DOMContentLoaded', loadData);

async function loadData() {
    const jobs = await getJobs();
    const myApps = await getApplications(null, session.id); // Get user's apps

    renderJobs(jobs, myApps);
    renderMyAppointments(myApps, jobs);
}

function renderJobs(jobs, myApps) {
    jobList.innerHTML = '';

    jobs.forEach(job => {
        // Check if already applied
        const isApplied = myApps.some(app => app.jobId === job.id);

        const card = document.createElement('div');
        card.className = 'bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition';

        card.innerHTML = `
            <div class="flex justify-between items-start mb-2">
                <div>
                    <h3 class="font-bold text-xl text-gray-800">${job.title}</h3>
                    <p class="text-blue-600 font-medium">${job.company}</p>
                </div>
                <span class="bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded">
                    $${job.salary}
                </span>
            </div>
            <p class="text-gray-600 text-sm mb-4 leading-relaxed">${job.description}</p>
            
            ${isApplied
                ? `<button class="w-full bg-gray-300 text-gray-600 py-2 rounded font-bold cursor-not-allowed" disabled>
                    Ya postulado
                   </button>`
                : `<button class="apply-btn w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded font-bold transition shadow" 
                    data-id="${job.id}" data-title="${job.title}">
                    Postularme
                   </button>`
            }
        `;
        jobList.appendChild(card);
    });

    // Listeners
    document.querySelectorAll('.apply-btn').forEach(btn => {
        btn.addEventListener('click', async (e) => {
            const jobId = e.target.dataset.id;
            const jobTitle = e.target.dataset.title;

            if (confirm(`¿Deseas postularte a: ${jobTitle}?`)) {
                await createApplication({
                    jobId: jobId,
                    userId: session.id,
                    date: new Date().toISOString().split('T')[0]
                });
                alert('¡Postulación exitosa!');
                loadData();
            }
        });
    });
}

function renderMyAppointments(myApps, jobs) {
    myApplicationsContainer.innerHTML = '';

    if (myApps.length === 0) {
        myApplicationsContainer.innerHTML = '<p class="text-gray-400 italic text-sm text-center py-4">Aún no te has postulado.</p>';
        return;
    }

    myApps.forEach(app => {
        const job = jobs.find(j => j.id === app.jobId);
        const jobTitle = job ? job.title : 'Empleo Cerrado';
        const company = job ? job.company : '-';

        const item = document.createElement('div');
        item.className = 'bg-blue-50 p-3 rounded border border-blue-100 text-sm';
        item.innerHTML = `
            <p class="font-bold text-gray-800">${jobTitle}</p>
            <p class="text-gray-600 font-xs">${company}</p>
            <div class="flex justify-between items-center mt-1">
                <span class="text-xs text-gray-400">${app.date}</span>
                <span class="text-[10px] text-blue-600 font-bold bg-blue-100 px-2 py-0.5 rounded-full">ENVIADO</span>
            </div>
        `;
        myApplicationsContainer.appendChild(item);
    });
}

// Logout
logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('job_session');
    window.location.href = '../../index.html';
});
