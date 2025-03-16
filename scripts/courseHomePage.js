import courses from './courseArray.mjs';

document.querySelector('.wayfinder').addEventListener('click', function () {
    const nav = document.querySelector('.header-nav');
    nav.classList.toggle('show');
});

const currentYear = new Date().getFullYear();
document.getElementById('currentyear').textContent = currentYear;

const lastModified = document.lastModified;
document.getElementById('lastModified').textContent = `Last Update: ${lastModified}`;

const courseTabs = document.getElementById('course-tabs');
const courseDetails = document.getElementById('course-details');

function renderCourses(filteredCourses) {
    courseTabs.innerHTML = '';
    filteredCourses.forEach(course => {
        const courseButton = document.createElement('button');
        courseButton.textContent = `${course.subject} ${course.number}`;

        if (course.completed) {
            courseButton.classList.add('done');
        }

        courseButton.addEventListener('click', () => {
            displayCourseDetails(course);
        });

        courseTabs.appendChild(courseButton);
    });
}

renderCourses(courses);

function filterCourses(subject) {
    let filteredCourses;
    if (subject === 'All') {
        filteredCourses = courses;
    } else {
        filteredCourses = courses.filter(course => course.subject === subject);
    }
    renderCourses(filteredCourses);
}

const categoryButtons = document.querySelectorAll('#course-categories button');
categoryButtons.forEach(button => {
    button.addEventListener('click', function () {
        const subject = this.textContent;

        filterCourses(subject);

        categoryButtons.forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
    });
});

const totalCredits = document.getElementById('total-credits');
function calculateTotalCredits() {
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    return totalCredits;
}

//display total credits
const creditsInTotal = calculateTotalCredits();
totalCredits.textContent = `Total Credits: ${creditsInTotal}`;

// remaining credits
// const creditsRemaining = document.getElementById('credits-remaining');
// function calculateRemainingCredits() {
//     const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
//     const completedCredits = courses.reduce((sum, course) => {
//         return course.completed ? sum + course.credits : sum;
//     }, 0);

//     const remainingCredits = totalCredits - completedCredits;
//     return remainingCredits;
// }

// Display remaining credits
// const remainingCredits = calculateRemainingCredits();
// creditsRemaining.textContent = `Remaining Credits: ${remainingCredits}`;

function displayCourseDetails(course) {
    courseDetails.innerHTML = '';
    courseDetails.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificat</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();
    closeModal.addEventListener("click", () => {
        courseDetails.close();
    });
}

course.Details.showModal();

document.getElementById('closeModal').addEventListener('click', () => {
    courseDetails.close();
});