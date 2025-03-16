import courses from './courseArray.js';

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
const totalCreditsElement = document.getElementById('total-credits');

function calculateTotalCredits(displayedCourses) {
    return displayedCourses.reduce((sum, course) => sum + course.credits, 0);
}

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


    const updatedCredits = calculateTotalCredits(filteredCourses);
    totalCreditsElement.textContent = `Total Credits: ${updatedCredits}`;
}

function filterCourses(subject) {
    let filteredCourses = subject === 'All' ? courses : courses.filter(course => course.subject === subject);
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


renderCourses(courses);

function displayCourseDetails(course) {
    courseDetails.innerHTML = `
    <button id="closeModal">X</button>
    <h2>${course.subject} ${course.number}</h2>
    <h3>${course.title}</h3>
    <p><strong>Credits</strong>: ${course.credits}</p>
    <p><strong>Certificate</strong>: ${course.certificate}</p>
    <p>${course.description}</p>
    <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
    `;

    courseDetails.showModal();

    document.getElementById("closeModal").addEventListener("click", () => {
        courseDetails.close();
    });
}
