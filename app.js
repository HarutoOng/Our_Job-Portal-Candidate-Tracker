// ============================
// JOB DATA
// ============================

let jobs = [
{
id:1,
title:"Cybersecurity Analyst",
company:"SecureTech Inc.",
category:"remote",
salary:"₱55,000/mo",
description:"Protect networks, monitor cyber threats, perform vulnerability assessments and security audits.",
bookmarked:false
},

{
id:2,
title:"Web Developer",
company:"CodeWorks PH",
category:"full-time",
salary:"₱45,000/mo",
description:"Develop responsive websites using HTML, CSS, Bootstrap and JavaScript.",
bookmarked:false
},

{
id:3,
title:"Network Administrator",
company:"NetLink Solutions",
category:"full-time",
salary:"₱50,000/mo",
description:"Manage routers, switches, servers and troubleshoot network problems.",
bookmarked:false
},

{
id:4,
title:"Frontend Developer",
company:"Pixel Studio",
category:"remote",
salary:"₱42,000/mo",
description:"Create responsive interfaces and improve user experience.",
bookmarked:false
},

{
id:5,
title:"SOC Analyst",
company:"Cyber Defense PH",
category:"full-time",
salary:"₱60,000/mo",
description:"Monitor security incidents and respond to cyber attacks.",
bookmarked:false
},

{
id:6,
title:"Backend Developer",
company:"CloudStack",
category:"remote",
salary:"₱58,000/mo",
description:"Develop APIs and manage databases for web applications.",
bookmarked:false
}
];

// ============================
// DOM ELEMENTS
// ============================

const jobGrid = document.getElementById("jobGrid");
const bookmarkCount = document.getElementById("bookmarkCount");

const homeView = document.getElementById("homeView");
const aboutView = document.getElementById("aboutView");
const detailsView = document.getElementById("detailsView");
const EmployeeRegistration1 = document.getElementById("EmployeeRegistration1");
const viewLinks = document.querySelectorAll(".view-link");
const filterBtns = document.querySelectorAll(".filter-btn");

let currentJobs = [...jobs];

// ============================
// RENDER JOBS
// ============================

function renderJobs(jobList){

jobGrid.innerHTML="";

jobList.forEach(job=>{

jobGrid.innerHTML += `

<div class="col-12 col-md-6 col-lg-4">

<div class="card job-card h-100 shadow">

<div class="card-body d-flex flex-column">

<div class="d-flex justify-content-between">

<div>

<h5>${job.title}</h5>

<p class="text-muted mb-1">
${job.company}
</p>

</div>

<i
class="bi bi-bookmark-star-fill bookmark-btn ${job.bookmarked ? 'active text-warning' : 'text-secondary'}"
data-id="${job.id}">
</i>

</div>

<div class="my-2">

<span class="badge ${job.category==='remote' ? 'bg-info' : 'bg-primary'}">

${job.category}

</span>

<span class="badge bg-success">

${job.salary}

</span>

</div>

<button
class="btn btn-outline-primary mt-auto view-details"
data-id="${job.id}">

View Details

</button>

</div>

</div>

</div>

`;

});

attachEvents();

updateBookmarkCount();

}

// ============================
// EVENTS
// ============================

function attachEvents(){

// Bookmark Button
document.querySelectorAll(".bookmark-btn").forEach(btn=>{

btn.addEventListener("click",function(){

const id=parseInt(this.dataset.id);

toggleBookmark(id);

});

});

// View Details Button
document.querySelectorAll(".view-details").forEach(btn=>{

btn.addEventListener("click",function(){

const id=parseInt(this.dataset.id);

showDetails(id);

});

});

}

// ============================
// BOOKMARK
// ============================

function toggleBookmark(id){

const job=jobs.find(job=>job.id===id);

if(job){

job.bookmarked=!job.bookmarked;

renderJobs(currentJobs);

}

}

// ============================
// BOOKMARK COUNTER
// ============================

function updateBookmarkCount(){

const total=jobs.filter(job=>job.bookmarked).length;

bookmarkCount.textContent=total;

}

// ============================
// FILTER JOBS
// ============================

filterBtns.forEach(btn=>{

btn.addEventListener("click",function(){

filterBtns.forEach(button=>{

button.classList.remove("active");

});

this.classList.add("active");

const filter=this.dataset.filter;

if(filter==="all"){

currentJobs=[...jobs];

}else{

currentJobs=jobs.filter(job=>job.category===filter);

}

renderJobs(currentJobs);

});

});

// ============================
// SHOW DETAILS
// ============================

function showDetails(id){

const job=jobs.find(job=>job.id===id);

if(!job) return;

document.getElementById("detTitle").textContent=job.title;
document.getElementById("detCompany").textContent=job.company;
document.getElementById("detType").textContent=job.category;
document.getElementById("detSalary").textContent=job.salary;
document.getElementById("detDesc").textContent=job.description;

switchView("details");

}

// ============================
// VIEW SWITCHING
// ============================

function switchView(view){

homeView.classList.add("d-none");
aboutView.classList.add("d-none");
detailsView.classList.add("d-none");
EmployeeRegistration1.classList.add("d-none");

if(view==="home"){

homeView.classList.remove("d-none");

}

if(view==="about"){

aboutView.classList.remove("d-none");

}

if(view==="details"){

detailsView.classList.remove("d-none");

}
{
    if(view==="EmployeeRegistration1"){
        EmployeeRegistration1.classList.remove("d-none");
    }
}

viewLinks.forEach(link=>{

link.classList.remove("active");

if(link.dataset.view===view){

link.classList.add("active");

}

});

}

// ============================
// NAVIGATION
// ============================

viewLinks.forEach(link=>{

link.addEventListener("click",function(e){

e.preventDefault();

switchView(this.dataset.view);

});

});

// ============================
// ADD JOB
// ============================

const jobForm = document.getElementById("jobForm");

jobForm.addEventListener("submit", function(e){

e.preventDefault();

const newJob = {

id: jobs.length + 1,

title: document.getElementById("title").value,

company: document.getElementById("company").value,

category: document.getElementById("category").value,

salary: document.getElementById("salary").value,

description: "Newly added job listing.",

bookmarked: false

};

jobs.push(newJob);

currentJobs = [...jobs];

renderJobs(currentJobs);

// Close Modal
const modalElement = document.getElementById("addJobModal");
const modal = bootstrap.Modal.getInstance(modalElement);

if(modal){
modal.hide();
}

jobForm.reset();

alert("Job added successfully!");

});

// ============================
// BACK BUTTON
// ============================

const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", function(){

switchView("home");

});

// ============================
// INITIALIZE
// ============================

renderJobs(currentJobs);

switchView("home");

// ============================
// OPTIONAL SEARCH FUNCTION
// (Use later if you add a search box)
// ============================

function searchJobs(keyword){

keyword = keyword.toLowerCase();

const filtered = jobs.filter(job =>

job.title.toLowerCase().includes(keyword) ||

job.company.toLowerCase().includes(keyword)

);

currentJobs = filtered;

renderJobs(currentJobs);

}

// --- STEP BY STEP PROCESSING ARCHITECTURE ---

    // DOM Phase Wrappers
    const phase1 = document.querySelector('#phase1');
    const phase2 = document.querySelector('#phase2');
    const phase3 = document.querySelector('#phase3');

    // DOM Step Headings Indicators
    const step1Indicator = document.querySelector('#step1Indicator');
    const step2Indicator = document.querySelector('#step2Indicator');
    const step3Indicator = document.querySelector('#step3Indicator');

    // DOM Validation Alert Box
    const validationAlert = document.querySelector('#validationAlert');

    // Capture Buttons Links
    const nextToPhase2 = document.querySelector('#nextToPhase2');
    const nextToPhase3 = document.querySelector('#nextToPhase3');
    const restartBtn = document.querySelector('#restartBtn');

    // Input Streams Nodes Selection
    const firstName = document.querySelector('#firstName');
    const middleName = document.querySelector('#middleName');
    const lastName = document.querySelector('#lastName');
    const extName = document.querySelector('#extName');
    const currentAddress = document.querySelector('#currentAddress');
    const permanentAddress = document.querySelector('#permanentAddress');

    // Target Previews Injections Nodes Selection
    const previewName = document.querySelector('#previewName');
    const previewCurrent = document.querySelector('#previewCurrent');
    const previewPermanent = document.querySelector('#previewPermanent');

    // TRANSITION ACTION 1: Processing Name Streams
    nextToPhase2.addEventListener('click', () => {
        // Reset dynamic visibility validation container flags
        validationAlert.classList.add('d-none');

        // Capture data values, then apply basic processing filters
        const fNameClean = firstName.value.trim();
        const lNameClean = lastName.value.trim();
        const mNameClean = middleName.value.trim();
        const eNameClean = extName.value.trim();

        // Strict validation rule enforcement
        if (fNameClean === "" || lNameClean === "" || mNameClean === "" || eNameClean === "") {
            validationAlert.classList.remove('d-none');
            validationAlert.textContent = "Validation Failure: First Name, Last Name, and Middle Name cannot be blank strings!";
            return;
        }



        // Advance visual stage indicator layout frames
        phase1.classList.add('d-none');
        phase2.classList.remove('d-none');
        
        step1Indicator.className = "text-muted flex-fill";
        step2Indicator.className = "text-primary border-bottom border-3 border-primary pb-1 flex-fill";
    });

    // TRANSITION ACTION 2: Processing Location Layout Streams
    nextToPhase3.addEventListener('click', () => {
        validationAlert.classList.add('d-none');

        const currentAddrClean = currentAddress.value.trim();
        const permAddrClean = permanentAddress.value.trim();

        // Strict layout validation check
        if (currentAddrClean === "" || permAddrClean === "") {
            validationAlert.classList.remove('d-none');
            validationAlert.textContent = "Validation Failure: Both Address fields are required fields!";
            return;
        }

        // Form string manipulation manipulations for Corporate HR Uniformity standards
        const formattedFirst = firstName.value.trim().toUpperCase();
        const formattedMiddle = middleName.value.trim() !== "" ? middleName.value.trim().toUpperCase() + " " : "";
        const formattedLast = lastName.value.trim().toUpperCase();
        const formattedExt = extName.value.trim() !== "" ? ", " + extName.value.trim().toUpperCase() : "";

        // Target injections handling
        previewName.textContent = `${formattedLast}, ${formattedFirst} ${formattedMiddle}${formattedExt}`;
        previewCurrent.textContent = currentAddrClean.toUpperCase();
        previewPermanent.textContent = permAddrClean.toUpperCase();

        // Switch panel layout view via d-none modifications
        phase2.classList.add('d-none');
        phase3.classList.remove('d-none');

        step2Indicator.className = "text-muted flex-fill";
        step3Indicator.className = "text-success border-bottom border-3 border-success pb-1 flex-fill";
    });

   // RESTART INTERFACES STATE ACTIONS
    restartBtn.addEventListener('click', () => {
        // 1. Alert the user that the registration was successful
        alert("Registration success!");

        // 2. Clear value streams inside DOM forms
        firstName.value = ""; middleName.value = ""; lastName.value = ""; extName.value = "";
        currentAddress.value = ""; permanentAddress.value = "";
        
        // 3. Return visibility toggles back to startup condition indexes
        phase3.classList.add('d-none');
        phase1.classList.remove('d-none');

        step3Indicator.className = "text-muted flex-fill";
        step1Indicator.className = "text-primary border-bottom border-3 border-primary pb-1 flex-fill";
    });
